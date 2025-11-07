import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  HeartPulse,
  UserPlus,
  ShieldCheck,
  CheckCircle,
  Search,
  PhoneCall,
  XCircle,
} from "lucide-react";
import "../styles/Match.css";

export default function Match() {
  const [matches, setMatches] = useState([]);
  const [contactInfo, setContactInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;

        // 🔁 Step 1: Trigger backend to find and update matches
        await fetch(`${baseUrl}/api/match/run`, { method: "POST" });

        // 🔁 Step 2: Fetch all updated matches
        const response = await fetch(`${baseUrl}/api/matches`);
        const data = await response.json();
        const formattedData = data.matches || data;
        setMatches(formattedData || []);
      } catch (err) {
        console.error("❌ Error fetching matches:", err);
      }
    };
    fetchMatches();
  }, []);

  const handleContactDonor = async (donorId) => {
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const res = await fetch(`${baseUrl}/api/contact-donor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ donorId }),
      });

      const data = await res.json();
      if (data.donorName) {
        setContactInfo(data);
        setShowModal(true);
      } else {
        alert(data.error || "Unable to fetch donor details right now.");
      }
    } catch (err) {
      console.error("❌ Error contacting donor:", err);
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="match-container">
      {/* HEADER */}
      <motion.div
        className="match-header"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.6 }}
      >
        <h1>Organ Match System</h1>
        <p>
          Our blockchain-verified network instantly finds the safest donor-recipient
          matches based on medical compatibility. Every match is recorded
          transparently and securely.
        </p>
      </motion.div>

      {/* INFO CARDS */}
      <div className="match-info">
        <motion.div className="match-card" whileHover={{ scale: 1.05 }}>
          <UserPlus size={42} className="icon" />
          <h3>Donor Verification</h3>
          <p>
            Every donor is verified through secure medical credentials stored on the
            blockchain.
          </p>
        </motion.div>

        <motion.div className="match-card" whileHover={{ scale: 1.05 }}>
          <Search size={42} className="icon" />
          <h3>Smart Matching</h3>
          <p>
            AI-assisted matching ensures accurate pairing based on blood group and
            organ compatibility.
          </p>
        </motion.div>

        <motion.div className="match-card" whileHover={{ scale: 1.05 }}>
          <ShieldCheck size={42} className="icon" />
          <h3>Blockchain Validation</h3>
          <p>
            Every successful match is permanently recorded on the blockchain for full
            transparency.
          </p>
        </motion.div>
      </div>

      {/* MATCH VISUALIZATION */}
      <motion.div
        className="match-list"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <h2>Live Match Records</h2>

        <div className="match-table">
          {matches.length > 0 ? (
            matches.map((m, i) => (
              <motion.div
                key={i}
                className="match-block"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <div className="match-top">
                  <HeartPulse className="icon heart" />
                  <h4>{m.organ}</h4>
                </div>

                <div className="match-body">
                  <p><strong>Donor:</strong> {m.donor || "N/A"}</p>
                  <p><strong>Recipient:</strong> {m.recipient || "N/A"}</p>
                  <p><strong>Compatibility:</strong> {m.compatibility || "Unknown"}</p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span className={`status ${m.status?.toLowerCase()}`}>
                      {m.status || "Pending"}
                    </span>
                  </p>
                  <p className="timestamp">{m.timestamp || "No timestamp"}</p>

                  {m.status === "Matched" && (
                    <button
                      className="contact-donor-btn"
                      onClick={() => handleContactDonor(m.donorId)}
                    >
                      <PhoneCall size={16} /> Contact Donor
                    </button>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="no-data-box">
              <XCircle size={40} className="no-match-icon" />
              <h3>No match found yet</h3>
              <p>
                We couldn’t find a compatible donor right now. Please check back later.
                In case of an emergency, contact your nearest hospital or registered
                organ donation center for immediate assistance.
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* FINAL CTA */}
      <motion.div
        className="match-cta"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <CheckCircle size={30} className="icon success" />
        <p>
          All matches are verified, timestamped, and stored securely. Our network keeps
          updating every few minutes for new donor-recipient links.
        </p>
      </motion.div>

      {/* ✅ Donor Contact Modal */}
      {showModal && contactInfo && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <motion.div
            className="contact-modal"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h2>Donor Contact Details</h2>
            <p><strong>Name:</strong> {contactInfo.donorName}</p>
            <p><strong>Email:</strong> {contactInfo.email}</p>
            <p><strong>Phone:</strong> {contactInfo.contactNumber}</p>
            <p><strong>City:</strong> {contactInfo.city}</p>

            <button className="close-btn" onClick={() => setShowModal(false)}>
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
