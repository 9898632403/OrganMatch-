from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime
import random
from web3 import Web3
import json
from bson.errors import InvalidId

app = Flask(__name__)

# ✅ Full CORS setup
CORS(
    app,
    supports_credentials=True,
    resources={r"/*": {"origins": ["http://localhost:5173"]}},
    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
)

@app.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        response = app.make_default_options_response()
        headers = response.headers
        headers["Access-Control-Allow-Origin"] = "http://localhost:5173"
        headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
        headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        return response

# ---------- MongoDB Connection ----------
MONGO_URI = "mongodb+srv://attendance:meet24032005@attndance.szi0v3s.mongodb.net/attendance_db?retryWrites=true&w=majority&appName=attndance"
client = MongoClient(MONGO_URI)

db = client.get_database("donor_db")
donors_col = db.get_collection("donors")
recipients_col = db.get_collection("recipients")
ledgers_col = db.get_collection("ledgers")
matches_col = db.get_collection("matches")

#for wallet
INFURA_URL = "https://sepolia.infura.io/v3/3e914a2a758140ada0c0a63650e080be"
w3 = Web3(Web3.HTTPProvider(INFURA_URL))

if w3.is_connected():
    print("✅ Connected to Sepolia Testnet")
    print("Block Number:", w3.eth.block_number)
else:
    print("❌ Connection failed")
    
CONTRACT_ADDRESS = "0x7E748046deF8Bb3eC7A0A68244FD8FbF13f109e8"

with open("../../blockchain/artifacts/contracts/OrganLedger.sol/OrganLedger.json") as f:


    contract_json = json.load(f)
    abi = contract_json["abi"]

# 4️⃣ Create contract instance
contract = w3.eth.contract(address=CONTRACT_ADDRESS, abi=abi)

# 5️⃣ Example route to fetch something
@app.route("/api/ledger-blockchain", methods=["GET"])
def get_ledger_from_blockchain():
    try:
        records = contract.functions.getAllRecords().call()
        formatted = [
            {
                "donor": r[0],
                "recipient": r[1],
                "organ": r[2],
                "status": r[3],
                "compatibility": r[4],
                "timestamp": r[5],
            }
            for r in records
        ]
        return jsonify({"ok": True, "records": formatted}), 200
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500


@app.route("/api/ledger/add", methods=["POST"])
def add_ledger_to_blockchain():
    try:
        data = request.get_json()
        donor = data.get("donor")
        recipient = data.get("recipient")
        organ = data.get("organ")
        status = data.get("status", "Matched")
        compatibility = data.get("compatibility", "N/A")
        timestamp = datetime.utcnow().isoformat()

        # Admin wallet (⚠️ use test account only)
        private_key = "YOUR_PRIVATE_KEY_HERE"
        admin_address = w3.eth.account.from_key(private_key).address

        txn = contract.functions.addRecord(
            donor, recipient, organ, status, compatibility, timestamp
        ).build_transaction({
            "from": admin_address,
            "nonce": w3.eth.get_transaction_count(admin_address),
            "gas": 2000000,
            "gasPrice": w3.to_wei("20", "gwei")
        })

        signed_txn = w3.eth.account.sign_transaction(txn, private_key)
        tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)

        return jsonify({
            "ok": True,
            "tx_hash": w3.to_hex(tx_hash)
        }), 200

    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500
   
# ---------- Helpers ----------
def now_iso():
    return datetime.utcnow().isoformat() + "Z"

def serialize_doc(doc):
    if not doc:
        return doc
    doc = dict(doc)
    if "_id" in doc:
        doc["_id"] = str(doc["_id"])
    return doc

def check_required(data, required_fields):
    missing = []
    for f in required_fields:
        val = data.get(f)
        if val is None or (isinstance(val, str) and val.strip() == ""):
            missing.append(f)
        elif isinstance(val, bool) and val is False:
            missing.append(f)
    return missing

# ---------- Basic Routes ----------
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Welcome to the Donor-Recipient Backend API!", "ok": True}), 200

@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({"ok": True, "message": "Backend is running!"}), 200

# ---------- Donor Routes ----------
@app.route("/api/donors", methods=["POST"])
def add_donor():
    data = request.get_json() or {}
    required = [
        "fullName", "age", "gender", "bloodGroup", "organType",
        "city", "state", "contactNumber", "email", "consent",
    ]
    missing = check_required(data, required)
    if missing:
        return jsonify({"ok": False, "error": f"Missing fields: {', '.join(missing)}"}), 400

    donor = {
        "fullName": data.get("fullName"),
        "age": data.get("age"),
        "gender": data.get("gender"),
        "bloodGroup": data.get("bloodGroup"),
        "organType": data.get("organType"),
        "city": data.get("city"),
        "state": data.get("state"),
        "contactNumber": data.get("contactNumber"),
        "email": data.get("email"),
        "healthHistory": data.get("healthHistory", ""),
        "consent": bool(data.get("consent")),
        "matched": False,
        "created_at": now_iso(),
    }

    res = donors_col.insert_one(donor)
    donor["_id"] = str(res.inserted_id)
    return jsonify({"ok": True, "message": "Donor registered successfully!", "donor": donor}), 201

@app.route("/api/donors", methods=["GET"])
def get_all_donors():
    docs = [serialize_doc(d) for d in donors_col.find().sort("created_at", -1)]
    return jsonify({"ok": True, "donors": docs}), 200

# ---------- Recipient Routes ----------
@app.route("/api/recipients", methods=["POST"])
def add_recipient():
    data = request.get_json() or {}
    required = ["name", "email", "organ", "bloodGroup"]
    missing = check_required(data, required)
    if missing:
        return jsonify({"ok": False, "error": f"Missing fields: {', '.join(missing)}"}), 400

    recipient = {
        "name": data.get("name"),
        "email": data.get("email"),
        "organ": data.get("organ"),
        "bloodGroup": data.get("bloodGroup"),
        "medicalHistory": data.get("medicalHistory", ""),
        "matched": False,
        "created_at": now_iso(),
    }

    res = recipients_col.insert_one(recipient)
    recipient["_id"] = str(res.inserted_id)
    return jsonify({"ok": True, "message": "Recipient registered successfully!", "recipient": recipient}), 201

@app.route("/api/recipients", methods=["GET"])
def get_all_recipients():
    docs = [serialize_doc(d) for d in recipients_col.find().sort("created_at", -1)]
    return jsonify({"ok": True, "recipients": docs}), 200

# ---------- Matches Routes ----------
@app.route("/api/matches", methods=["GET"])
def get_matches():
    docs = list(matches_col.find().sort("created_at", -1))
    enriched = []

    for d in docs:
        donor = None
        recipient = None

        donor_id = d.get("donorId")
        recipient_id = d.get("recipientId")

        try:
            if donor_id:
                donor = donors_col.find_one({"_id": ObjectId(donor_id)})
        except InvalidId:
            donor = None

        try:
            if recipient_id:
                recipient = recipients_col.find_one({"_id": ObjectId(recipient_id)})
        except InvalidId:
            recipient = None

        d["donor"] = donor.get("fullName") if donor else "Unknown Donor"
        d["recipient"] = (
            recipient.get("name") or recipient.get("fullName")
            if recipient else "Unknown Recipient"
        )
        d["timestamp"] = d.get("created_at") or now_iso()

        enriched.append(serialize_doc(d))
    return jsonify(enriched), 200


@app.route("/api/matches", methods=["POST"])
def create_match_manual():
    data = request.get_json() or {}
    required = ["donorId", "recipientId", "organ", "compatibility", "status"]
    missing = check_required(data, required)
    if missing:
        return jsonify({"ok": False, "error": f"Missing fields: {', '.join(missing)}"}), 400

    match = {
        "donorId": data.get("donorId"),
        "recipientId": data.get("recipientId"),
        "organ": data.get("organ"),
        "compatibility": data.get("compatibility"),
        "status": data.get("status"),
        "created_at": now_iso(),
    }
    res = matches_col.insert_one(match)
    match["_id"] = str(res.inserted_id)
    return jsonify({"ok": True, "message": "Match created", "match": match}), 201

# ---------- Automated Matching ----------
@app.route("/api/match/run", methods=["POST"])
def run_matching():
    # Fetch only unmatched donors and recipients
    recipients = list(recipients_col.find({"matched": False}))
    donors = list(donors_col.find({"matched": False, "consent": True}))
    matched_results = []

    if not recipients or not donors:
        return jsonify({"ok": False, "message": "No available donors or recipients."}), 200

    for r in recipients:
        # Re-fetch latest donor list (so recently matched ones are skipped correctly)
        donors = list(donors_col.find({"matched": False, "consent": True}))

        # find all possible matches
        possible_donors = [
            d for d in donors
            if d.get("organType", "").strip().lower() == r.get("organ", "").strip().lower()
            and d.get("bloodGroup", "").strip().upper() == r.get("bloodGroup", "").strip().upper()
        ]

        if not possible_donors:
            continue

        # pick best (first) donor
        donor = possible_donors[0]
        compatibility = f"{random.randint(85, 99)}%"

        # create match document
        match_doc = {
            "donorId": str(donor["_id"]),
            "recipientId": str(r["_id"]),
            "organ": r["organ"],
            "compatibility": compatibility,
            "status": "Matched",
            "created_at": now_iso(),
        }
        matches_col.insert_one(match_doc)

        # create blockchain ledger entry
        block_id = f"blk-{int(datetime.utcnow().timestamp())}-{random.randint(100,999)}"
        ledger_entry = {
            "block_id": block_id,
            "donorId": str(donor["_id"]),
            "recipientId": str(r["_id"]),
            "organ": r["organ"],
            "status": "Matched",
            "meta": {"compatibility": compatibility},
            "timestamp": now_iso(),
        }
        ledgers_col.insert_one(ledger_entry)

        # mark donor & recipient as matched
        donors_col.update_one({"_id": donor["_id"]}, {"$set": {"matched": True}})
        recipients_col.update_one({"_id": r["_id"]}, {"$set": {"matched": True}})

        matched_results.append({
            "donor": donor.get("fullName", "Unknown Donor"),
            "recipient": r.get("name", "Unknown Recipient"),
            "organ": r["organ"],
            "compatibility": compatibility,
            "status": "Matched"
        })

    if not matched_results:
        return jsonify({"ok": False, "message": "No compatible matches found."}), 200

    return jsonify({"ok": True, "matches": matched_results}), 200
    


# ---------- Ledger Routes ----------
@app.route("/api/ledger", methods=["GET"])
def get_ledger():
    docs = list(ledgers_col.find().sort("timestamp", -1))
    enriched = []
    for d in docs:
        donor = donors_col.find_one({"_id": ObjectId(d.get("donorId"))})
        recipient = recipients_col.find_one({"_id": ObjectId(d.get("recipientId"))})

        # ✅ Handles both "name" and "fullName"
        d["donor"] = (donor.get("fullName") if donor else "Unknown Donor")
        d["recipient"] = (
            recipient.get("name") or recipient.get("fullName")
            if recipient else "Unknown Recipient"
        )

        d["block_id"] = d.get("block_id") or d.get("blockId") or f"blk-{random.randint(1000,9999)}"
        d["timestamp"] = d.get("timestamp") or now_iso()

        enriched.append(serialize_doc(d))
    return jsonify(enriched), 200


#ledger from blockchain
@app.route("/api/ledger-blockchain", methods=["GET"])
def get_blockchain_ledger():
    try:
        records = contract.functions.getAllRecords().call()

        formatted_records = []
        for i, record in enumerate(records):
            formatted_records.append({
                "block_id": i + 1,
                "donor": record[0],
                "recipient": record[1],
                "organ": record[2],
                "status": record[3],
                "compatibility": record[4],
                "timestamp": record[5],
            })

        return jsonify(formatted_records)
    except Exception as e:
        print("❌ Blockchain fetch error:", e)
        return jsonify({"error": str(e)}), 500



# ---------- Debug Utility ----------
@app.route("/api/debug/clear_all_demo", methods=["POST"])
def clear_all_demo():
    donors_col.delete_many({})
    recipients_col.delete_many({})
    matches_col.delete_many({})
    ledgers_col.delete_many({})
    return jsonify({"ok": True, "message": "All collections cleared."}), 200

#print all data 
@app.route("/api/debug/show_all", methods=["GET"])
def show_all_data():
    try:
        donors = list(donors_col.find())
        recipients = list(recipients_col.find())
        matches = list(matches_col.find())
        ledgers = list(ledgers_col.find())

        def simplify(docs):
            return [
                {
                    "_id": str(d["_id"]),
                    **{k: v for k, v in d.items() if k not in ["_id"]}
                }
                for d in docs
            ]

        result = {
            "donors": simplify(donors),
            "recipients": simplify(recipients),
            "matches": simplify(matches),
            "ledgers": simplify(ledgers),
        }

        print("\n========== DEBUG DATABASE DUMP ==========")
        print("🩸 Donors:", len(donors))
        print("❤️ Recipients:", len(recipients))
        print("🔗 Matches:", len(matches))
        print("📜 Ledgers:", len(ledgers))
        print("=========================================\n")

        return jsonify(result), 200

    except Exception as e:
        print("❌ Error in /api/debug/show_all:", e)
        return jsonify({"error": str(e)}), 500

@app.route("/api/debug/run_match", methods=["GET"])
def debug_run_match():
    from flask import jsonify
    result = run_matching()
    return result
 
#for contact info
@app.route("/api/contact-donor", methods=["POST"])
def contact_donor():
    data = request.get_json()
    donor_id = data.get("donorId")

    if not donor_id:
        return jsonify({"error": "Missing donorId"}), 400

    donor = db.donors.find_one({"_id": ObjectId(donor_id)})
    if not donor:
        return jsonify({"error": "Donor not found"}), 404

    # ✅ Return donor details (temporarily public)
    return jsonify({
        "message": "Contact details fetched successfully",
        "donorName": donor.get("fullName", "N/A"),
        "contactNumber": donor.get("contactNumber", "N/A"),
        "email": donor.get("email", "N/A"),
        "city": donor.get("city", "N/A")
    })

# ✅ Reset all donors & recipients to unmatched
@app.route("/api/debug/reset_match_flags", methods=["POST"])
def reset_match_flags():
    try:
        donors_col.update_many({}, {"$set": {"matched": False}})
        recipients_col.update_many({}, {"$set": {"matched": False}})
        return jsonify({"ok": True, "message": "All donors and recipients reset to unmatched."}), 200
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500


# ---------- Run ----------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
