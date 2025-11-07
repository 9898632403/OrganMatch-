import React from "react";
import { motion } from "framer-motion";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <motion.div
          className="footer-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="footer-brand">
            <div className="footer-logo">
              <motion.div
                className="blood-drop-small"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              OrganMatch<sup>+</sup>
            </div>
            <p>
              Secure, transparent organ donation powered by blockchain
              technology.
            </p>
          </div>

          <div className="footer-links">
            <div className="link-group">
              <h4>Platform</h4>
              <a href="/donor">For Donors</a>
              <a href="/recipient">For Recipients</a>
            </div>

            <div className="link-group">
              <h4>
                OrganMatch<sup>+</sup>
              </h4>
              <a href="#about">About Us</a>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p>
            © 2024 BloodChain. All rights reserved. Saving lives, one donation at
            a time.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
