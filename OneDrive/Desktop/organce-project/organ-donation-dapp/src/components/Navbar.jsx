import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);

  const links = ["Home", "Donor", "Recipient", "Ledger", "Match"];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const topVariants = {
    hidden: { y: -60, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  const menuVariants = {
    closed: { opacity: 0, scaleY: 0 },
    open: {
      opacity: 1,
      scaleY: 1,
      transition: { duration: 0.35 }
    }
  };

  return (
    <motion.nav
      className={`nav ${scrolled ? "nav-scrolled" : ""}`}
      variants={topVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="nav-inner">

        {/* Logo */}
        <motion.div
          className="nav-logo"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          OrganMatch<sup>+</sup>
        </motion.div>

        {/* Desktop Links */}
        <div className="nav-links">
          {links.map((l) => (
            <Link
              key={l}
              to={`/${l.toLowerCase()}`}
              className={`nav-link ${active === l ? "active" : ""}`}
              onClick={() => setActive(l)}
            >
              {l}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="nav-toggle"
          onClick={() => setOpen(!open)}
          whileTap={{ scale: 0.9 }}
        >
          <span className={open ? "line top active" : "line top"} />
          <span className={open ? "line mid active" : "line mid"} />
          <span className={open ? "line bot active" : "line bot"} />
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            style={{ originY: 0 }}
          >
            {links.map((l, i) => (
              <motion.div
                key={l}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  to={`/${l.toLowerCase()}`}
                  className={`mobile-link ${active === l ? "active" : ""}`}
                  onClick={() => {
                    setActive(l);
                    setOpen(false);
                  }}
                >
                  {l}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
