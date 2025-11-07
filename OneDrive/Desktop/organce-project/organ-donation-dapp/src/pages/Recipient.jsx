import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, ShieldCheck, HeartPulse, UserPlus } from "lucide-react";
import "../styles/Recipient.css";

export default function Recipient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organ: "",
    bloodGroup: "",
    medicalHistory: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  const fadeIn = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };
  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setSubmitted(false);

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const res = await fetch(`${baseUrl}/api/recipients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitted(true);
        setMessage("✅ Registration successful! You’ll be contacted soon.");
        setFormData({ name: "", email: "", organType: "", bloodGroup: "", medicalHistory: "" });
      } else {
        setMessage(data.error || "Failed to register. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting recipient form:", error);
      setMessage("⚠️ Server error. Please try again later.");
    }
  };

  return (
    <div className="recipient-page">
      <style>{`
        .recipient-page {
          min-height: 100vh;
          background: linear-gradient(to bottom, #ffffff, #f8fafc);
          color: #1e293b;
          font-family: "Inter", sans-serif;
        }
        .section {
          padding: 4rem 1.5rem;
        }
        .btn {
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .btn:hover {
          transform: scale(1.03);
        }
        .form-container {
          max-width: 700px;
          margin: 0 auto;
          background: #fff;
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0 10px 25px rgba(0,0,0,0.05);
        }
        .form-field {
          display: flex;
          flex-direction: column;
          margin-bottom: 1rem;
        }
        .form-field label {
          font-weight: 500;
          margin-bottom: 0.4rem;
        }
        .form-field input, .form-field textarea, .form-field select {
          padding: 0.75rem;
          border-radius: 0.5rem;
          border: 1px solid #cbd5e1;
          outline: none;
        }
        .form-field input:focus, .form-field textarea:focus, .form-field select:focus {
          border-color: #6366f1;
        }
      `}</style>

      {/* HERO */}
      <section className="section" style={{ overflow: "hidden" }}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.h1 variants={fadeIn} className="text-4xl font-semibold">
              Secure organ matches powered by blockchain
            </motion.h1>
            <motion.p variants={fadeIn} className="text-lg text-slate-700 mt-4">
              A trustworthy network connecting recipients with verified donors. Immutable matching, end-to-end traceability, and live status updates for every step.
            </motion.p>

            <motion.div variants={fadeIn} className="flex gap-4 mt-6">
              <a href="#register" className="btn bg-indigo-600 text-white px-5 py-3 rounded-full shadow">
                Get Matched
              </a>
            </motion.div>

            <motion.div variants={fadeIn} className="mt-8 grid grid-cols-2 gap-4 max-w-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-emerald-50 rounded-md">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <div className="text-sm font-medium">Verified Donors</div>
                  <div className="text-sm text-slate-600">Strict identity and health checks</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-rose-50 rounded-md">
                  <HeartPulse size={20} />
                </div>
                <div>
                  <div className="text-sm font-medium">Priority Matching</div>
                  <div className="text-sm text-slate-600">Optimized for urgency and compatibility</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 18 }}
            className="relative bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm text-slate-500">Match score</div>
                <div className="text-3xl font-semibold">82%</div>
              </div>
              <div className="text-right text-sm text-slate-500">
                <div>ETA to transplant</div>
                <div className="font-medium">6h 24m</div>
              </div>
            </div>

            <div className="mt-6">
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div style={{ width: "82%" }} className="h-full bg-gradient-to-r from-emerald-400 to-indigo-600" />
              </div>
              <div className="mt-3 text-sm text-slate-600">Live blockchain confirmations</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* REGISTER FORM */}
      <section id="register" className="section">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h3 className="text-2xl font-semibold">Recipient Registration</h3>
          <p className="text-slate-600 mt-2">
            Enter your details to request a match. Your information is encrypted and verified securely.
          </p>
        </div>

        <motion.div className="form-container" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}>
          {submitted ? (
            <div className="text-center text-emerald-600 text-lg font-medium">
              ✅ Registration submitted successfully! You’ll be contacted soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-field">
                <label>Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </div>

              <div className="form-field">
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>

              <div className="form-field">
                <label>Organ Needed</label>
                <select name="organ" value={formData.organ} onChange={handleChange} required>
                  <option value="">Select an organ</option>
                  <option value="Heart">Heart</option>
                  <option value="Kidney">Kidney</option>
                  <option value="Liver">Liver</option>
                  <option value="Lungs">Lungs</option>
                </select>
              </div>

              <div className="form-field">
                <label>Blood Group</label>
                <input type="text" name="bloodGroup" placeholder="e.g. A+, O-" value={formData.bloodGroup} onChange={handleChange} required />
              </div>

              <div className="form-field">
                <label>Medical History</label>
                <textarea name="medicalHistory" rows="4" value={formData.medicalHistory} onChange={handleChange}></textarea>
              </div>

              {message && (
                <div className="text-center text-slate-600 mb-3">{message}</div>
              )}

              <button type="submit" className="w-full mt-4 bg-indigo-600 text-white py-3 rounded-lg btn">
                Submit Registration
              </button>
            </form>
          )}
        </motion.div>
      </section>
    </div>
  );
}
