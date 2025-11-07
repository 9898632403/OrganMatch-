# 🧬 OrganMatch+ – A Blockchain-Based Secure Organ Donation Platform

> **OrganMatch+** is a blockchain-powered decentralized application (DApp) that ensures transparency, trust, and security in the organ donation and transplantation process.  
> It leverages smart contracts and decentralized ledgers to automate donor-recipient matching, eliminate data tampering, and promote ethical organ donation practices.

---

## 📖 Overview

OrganMatch+ aims to solve the challenges of traditional organ donation systems — such as data manipulation, lack of transparency, and unauthorized access — by using blockchain technology.  
Every donor and recipient record is securely stored in a **tamper-proof ledger**, verified through **smart contracts**, and managed in a **transparent decentralized network**.

---

## 🎯 Aim

To develop a **secure, transparent, and decentralized organ donation system** using blockchain technology, ensuring ethical and reliable management of donor and recipient data.

---

## ⚙️ Objectives

- ✅ Ensure authenticity and transparency of donor and recipient data  
- 🔒 Prevent data manipulation and unauthorized access  
- 🤖 Automate donor-recipient matching using smart contracts  
- 🏥 Provide a decentralized platform for hospitals and authorities  
- 🌍 Promote ethical and fraud-free organ donation practices  

---

## 🧠 Key Features

| Feature | Description |
|----------|-------------|
| 🧾 **Blockchain Ledger** | Stores all donor-recipient records immutably |
| 🤝 **Smart Contracts** | Automates organ matching, approval, and verification |
| 🔐 **Data Security** | Cryptographic security for all transactions |
| 🏛️ **Decentralized Access** | Only verified hospitals & admins can update records |
| 🪄 **Transparency** | Real-time traceability of organ donations |

---

## 🧩 System Architecture

**Architecture Flow:**

1. Donor and Recipient register through the DApp.  
2. Hospital/Admin verifies identity and health details.  
3. Smart contract executes matching and approval logic.  
4. Blockchain stores and secures verified transactions.  
5. Donor–Recipient linkage and updates are recorded immutably.

---

## 💻 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Blockchain Framework** | Ethereum / Hardhat |
| **Smart Contract Language** | Solidity |
| **Frontend** | React + Vite (HTML, CSS, JS) |
| **Backend** | Node.js / Express.js + Python (run.py) |
| **Storage** | IPFS for decentralized file/data storage |
| **Wallet Integration** | MetaMask |
| **Development Tools** | Remix IDE, Hardhat, Visual Studio Code |

---

## 📂 Project Structure

| Folder / File | Description |
|----------------|-------------|
| `blockchain/` | Smart contracts, deployment scripts, Hardhat config |
| `organ-donation-dapp/` | Frontend (React + Vite) and backend (Python Flask) |
| `docs/` | All documentation – report, diagrams, PPT |
| `README.md` | Project overview and usage guide |
| `ProjectReport.pdf` | Final project report for submission |

---

## ⚙️ Setup & Installation Guide

Follow the steps below to run the **OrganMatch+** project on your local machine.

---

### 🧱 1️⃣ Prerequisites

Before you begin, make sure you have these installed:

- **Node.js** (v16 or later) → [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Python 3.x**
- **Metamask** browser extension
- **Hardhat** (automatically installed during setup)
- **Git** for cloning the repository

---

### 📦 2️⃣ Clone the Repository

```bash
git clone https://github.com/9898632403/OrganMatch.git
cd OrganMatch

cd blockchain
npm install                # Install blockchain dependencies
npx hardhat compile        # Compile smart contracts
npx hardhat node           # Start a local blockchain network
npx hardhat run scripts/deploy.js --network localhost   # Deploy the contract

```
### 📦 3️⃣ Setup Blockchain (Hardhat)

This folder contains the smart contracts for the project.

 ```bash
cd blockchain
npm install                # Install blockchain dependencies
npx hardhat compile        # Compile smart contracts
npx hardhat node           # Start a local blockchain network
npx hardhat run scripts/deploy.js --network localhost   # Deploy the contract
```

### 🧠 4️⃣ Setup Backend (Flask API)
This handles server-side logic and connects the DApp to blockchain data.

```bash
cd ../organ-donation-dapp/backend
pip install -r requirements.txt   # Install Python dependencies
python run.py                     # Start Flask backend
```

### 💻 5️⃣ Setup Frontend (React + Vite)
This is your DApp interface for users (donors, recipients, hospitals).

```bash
cd ../
npm install           # Install frontend dependencies
npm run dev           # Start the React app
```

### 🔐 6️⃣ Connect Metamask to Local Network
Open Metamask → Networks → “Add Network”

Use the following details:

Network Name: Hardhat Localhost

RPC URL: http://127.0.0.1:8545/

Chain ID: 31337

Import one of the private keys shown in your Hardhat console.

Refresh your DApp page — Metamask should now connect automatically.

### ✅ 7️⃣ Run the DApp
Once everything is running:

Hardhat (Blockchain) → running

Flask (Backend) → running

React (Frontend) → running

Now open your browser and go to →
👉 http://localhost:5173/

You should see your OrganMatch dashboard live! 🎉

---

## 🧾 Project Report & Demo

📘 [**Download Project Report (PDF)**](docs/ProjectReport.pdf)  
🎞️ [**Watch Demo Video**](https://drive.google.com/your-demo-video-link) 

---

## 👥 Team Members

| Name         | Course   | Specialization | Semester | IAR No  |
|--------------|---------|----------------|----------|---------|
| Meet Mochi   | B.Tech CE |  AI          | 5        | 14502   |
| Disha Girase | B.Tech CE |  AI          | 5        | 14099   |

---
## 📜 License
This project is open-source under the **MIT License**.

---
## 🙏 Acknowledgments
- Special thanks to our project guide for guidance.
- Resources: Hardhat, Remix, MetaMask, React Docs.

---











 

