import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../styles/Ledger.css";
import { ShieldCheck, Database, Lock, Link, Activity } from "lucide-react";

export default function Ledger() {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch blocks from backend safely
  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(`${baseUrl}/api/ledger`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error(`Server returned ${response.status}`);
        }

        const data = await response.json();

        // Handle possible data shapes
        if (Array.isArray(data)) {
          setBlocks(data);
        } else if (Array.isArray(data.blocks)) {
          setBlocks(data.blocks);
        } else {
          setBlocks([]);
        }
      } catch (err) {
        console.error("Error fetching ledger:", err);
        setError("Failed to load blockchain data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlocks();
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="ledger-container">
      {/* HEADER */}
      <motion.div
        className="ledger-header"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.6 }}
      >
        <h1>Blockchain Ledger</h1>
        <p>
          Every organ transaction is recorded securely and transparently on the blockchain.
          Each block contains donor and recipient details, organ type, and verification status,
          ensuring trust in the donation chain.
        </p>
      </motion.div>

      {/* INFO CARDS */}
      <div className="ledger-info">
        <motion.div className="info-card" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
          <ShieldCheck size={42} className="icon" />
          <h3>Transparency</h3>
          <p>All donation records are visible, traceable, and cannot be altered once verified.</p>
        </motion.div>

        <motion.div className="info-card" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
          <Database size={42} className="icon" />
          <h3>Distributed Records</h3>
          <p>Ledger data is stored across multiple nodes, ensuring no single point of failure.</p>
        </motion.div>

        <motion.div className="info-card" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
          <Lock size={42} className="icon" />
          <h3>Data Security</h3>
          <p>Each block is cryptographically linked to the previous one, guaranteeing data integrity.</p>
        </motion.div>
      </div>

      {/* LEDGER VISUALIZATION */}
      <motion.div
        className="blockchain-view"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <h2>Live Blockchain Ledger</h2>

        {loading ? (
          <p className="loading-text">Loading blockchain data...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : blocks.length === 0 ? (
          <p className="no-data">No blocks recorded yet.</p>
        ) : (
          <div className="chain">
            {blocks.map((block, index) => (
              <motion.div
                key={block._id || index}
                className="block"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="block-id">Block #{block.block_id || index + 1}</div>
                <div className="block-content">
                  <p>
                    <strong>Donor:</strong> {block.donor || "N/A"}
                  </p>
                  <p>
                    <strong>Recipient:</strong> {block.recipient || "N/A"}
                  </p>
                  <p>
                    <strong>Organ:</strong> {block.organ || "N/A"}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`status ${
                        block.status?.includes("Pending")
                          ? "pending"
                          : block.status === "Matched"
                          ? "matched"
                          : "verified"
                      }`}
                    >
                      {block.status || "Unknown"}
                    </span>
                  </p>
                  <p className="timestamp">{block.timestamp || "Timestamp unavailable"}</p>
                </div>
                {index < blocks.length - 1 && (
                  <div className="chain-link">
                    <Link size={20} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* ACTIVITY SECTION */}
      <motion.div
        className="activity-section"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ delay: 0.5, duration: 0.7 }}
      >
        <h2>Network Activity</h2>
        <div className="activity-card">
          <Activity size={28} />
          <p>
            {blocks.length > 0
              ? `Last block added at ${blocks[blocks.length - 1].timestamp || "N/A"}`
              : "Awaiting first transaction update."}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
