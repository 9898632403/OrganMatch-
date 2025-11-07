import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import '../styles/Home.css';

const Home = () => {
  const [particles, setParticles] = useState([]);

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  useEffect(() => {
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 15 + 15,
      delay: Math.random() * 3
    }));
    setParticles(newParticles);
  }, []);

  const statsData = [
    { number: '5k+', label: 'Lives Saved' },
    { number: '2k+', label: 'Active Donors' },
    { number: '4k+', label: 'Successful Matches' },
    { number: '99.9%', label: 'Success Rate' }
  ];

  const missionCards = [
    {
      icon: '🛡️',
      title: 'Safe Donation System',
      description: 'Every donation is tracked with medical verification and secure handling protocols.',
      stats: '99.8% Safety Record'
    },
    {
      icon: '⛓️',
      title: 'Blockchain Transparency',
      description: 'Immutable records on blockchain ensure complete transparency and trust in the process.',
      stats: '100% Tamper-Proof'
    },
    {
      icon: '⚡',
      title: 'Fast Matching',
      description: 'AI-powered matching connects donors and recipients in minutes, not days.',
      stats: '< 5min Average Match Time'
    },
    {
      icon: '✅',
      title: 'Verified Users',
      description: 'All donors and recipients undergo thorough verification for community safety.',
      stats: '5K+ Verified Users'
    }
  ];

  const processSteps = [
    { 
      number: '01', 
      title: 'Register & Verify', 
      description: 'Complete secure registration with medical verification' 
    },
    { 
      number: '02', 
      title: 'Smart Matching', 
      description: 'AI matches donors with recipients based on location and needs' 
    },
    { 
      number: '03', 
      title: 'Secure Connection', 
      description: 'Blockchain ensures transparent and secure transactions' 
    },
    { 
      number: '04', 
      title: 'Save Lives', 
      description: 'Complete the donation process and track your impact' 
    }
  ];

  const trustBadges = [
    { icon: '🔒', text: 'HIPAA Compliant' },
    { icon: '🛡️', text: 'Blockchain Secured' },
    { icon: '🏥', text: 'Hospital Partners' }
  ];

  return (
    <div className="home-container">
      {/* Animated Background */}
      <div className="background-elements">
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [0, -80, 0],
              x: [0, 15, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <motion.div 
          className="hero-content"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="badge-pulse"></span>
            Trusted by 500+ Hospitals Worldwide
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="title-line">Donate Organ,</span>
            <span className="title-line accent">Save Lives</span>
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Connecting compassionate donors with recipients in need through 
            <span className="highlight"> secure blockchain technology</span> and 
            intelligent matching systems.
          </motion.p>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {statsData.map((stat, index) => (
              <div key={stat.label} className="stat-item">
                <motion.div
                  className="stat-number"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
                >
                  {stat.number}
                </motion.div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <motion.button
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="btn-glow"></span>
              <a href="/donor">Become a Donor</a>
            </motion.button>

            <motion.button
              className="btn btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Find Organ Now
              <div className="btn-urgency">Urgent</div>
            </motion.button>
          </motion.div>

          <motion.div
            className="hero-trust"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <div className="trust-label">Verified & Secure</div>
            <div className="trust-badges">
              {trustBadges.map((badge, index) => (
                <div key={index} className="badge">
                  {badge.icon} {badge.text}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="pulse-visual">
            <motion.div
              className="pulse-line-main"
              animate={{ 
                scaleY: [1, 1.2, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="pulse-node"
              animate={{ 
                scale: [1, 1.3, 1],
                boxShadow: [
                  "0 0 0 0 rgba(215, 38, 61, 0.4)",
                  "0 0 0 10px rgba(215, 38, 61, 0)",
                  "0 0 0 0 rgba(215, 38, 61, 0.4)"
                ]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          </div>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="mission-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <h2>Why Choose OrganMatch<sup>+</sup>?</h2>
            <p>Revolutionizing blood donation through technology and compassion</p>
            <motion.div
              className="header-pulse-line"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            />
          </motion.div>

          <div className="mission-grid">
            {missionCards.map((card, index) => (
              <motion.div
                key={card.title}
                className="mission-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="card-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <div className="card-stats">{card.stats}</div>
                <motion.div
                  className="card-pulse-line"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="about" className="about-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <h2>How It Works</h2>
            <p>Simple, secure process to connect donors with those in need</p>
          </motion.div>

          <div className="steps-grid">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                className="step"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="step-number">{step.number}</div>
                <h4>{step.title}</h4>
                <p>{step.description}</p>
                <motion.div
                  className="step-pulse"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section">
        <motion.div
          className="cta-content"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Ready to Make a Difference?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Join thousands of life-savers in our secure donation community
          </motion.p>

          <Link to="/donor" style={{ textDecoration: "none" }}>
            <motion.button
              className="btn btn-large"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Start Saving Lives Today
              <motion.span
                className="btn-sparkle"
                animate={{ rotate: [0, 180, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                ✨
              </motion.span>
            </motion.button>
          </Link>
        </motion.div>
      </section>

    </div>
  );
};

export default Home;
