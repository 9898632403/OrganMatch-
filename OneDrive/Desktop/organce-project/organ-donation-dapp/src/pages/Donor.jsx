import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import '../styles/Donor.css';

const Donor = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: '',
    bloodGroup: '',
    organType: '',
    city: '',
    state: '',
    contactNumber: '',
    email: '',
    healthHistory: '',
    consent: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE}/api/donors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setIsSubmitted(true);
        setFormData({
          fullName: '',
          age: '',
          gender: '',
          bloodGroup: '',
          organType: '',
          city: '',
          state: '',
          contactNumber: '',
          email: '',
          healthHistory: '',
          consent: false
        });
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to register donor');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Server error. Please try again.');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formFields = [
    { name: 'fullName', label: 'Full Name', type: 'text', required: true },
    { name: 'age', label: 'Age', type: 'number', required: true },
    { name: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'], required: true },
    { name: 'bloodGroup', label: 'Blood Group', type: 'select', options: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], required: true },
    { name: 'organType', label: 'Organ Type', type: 'select', options: ['Heart', 'Kidney', 'Liver', 'Lungs', 'Pancreas', 'Eyes', 'Tissues', 'Bone Marrow'], required: true },
    { name: 'city', label: 'City', type: 'text', required: true },
    { name: 'state', label: 'State', type: 'text', required: true },
    { name: 'contactNumber', label: 'Contact Number', type: 'tel', required: true },
    { name: 'email', label: 'Email Address', type: 'email', required: true },
  ];

  const infoCards = [
    {
      icon: '❤️',
      title: 'Gift of Life',
      description: 'Organ donation is the ultimate act of generosity, giving someone a second chance at life when they need it most.'
    },
    {
      icon: '🔗',
      title: 'Blockchain Security',
      description: 'Every donation is recorded on an immutable blockchain, ensuring complete transparency and preventing fraud.'
    },
    {
      icon: '🛡️',
      title: 'Trust & Privacy',
      description: 'Your personal information is encrypted and stored securely, with access controlled through smart contracts.'
    }
  ];

  return (
    <div className="donor-page">
      {/* Hero Section with Background */}
      <section className="hero-section">
        <div className="hero-background"></div>
        <div className="hero-overlay"></div>
        
        <motion.div
          className="hero-content"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Give the Gift of Life
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Join the blockchain-powered organ donation registry and become a hero in someone's story
          </motion.p>
          
          <motion.div
            className="progress-indicator"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 1, duration: 1.5 }}
          >
            <div 
              className="progress-fill" 
              style={{ width: `${scrollProgress}%` }}
            ></div>
          </motion.div>
        </motion.div>
      </section>

      {/* Information Section */}
      <section ref={sectionRef} className="info-section">
        <div className="info-background"></div>
        <div className="container">
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="section-title"
          >
            Transforming Lives with Technology
          </motion.h2>
          
          <div className="info-grid">
            {infoCards.map((card, index) => (
              <motion.div
                key={index}
                className="info-card"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                whileHover={{ y: -5 }}
              >
                <div className="card-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Donor Form Section */}
      <section className="form-section">
        <div className="form-background"></div>
        <div className="container">
          <motion.div
            className="form-container"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="form-header">
              <h2>Become a Life Donor</h2>
              <p>Your information is secured with blockchain technology</p>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="donor-form">
                <div className="form-grid">
                  {formFields.map((field, index) => (
                    <motion.div
                      key={field.name}
                      className="form-field"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <label htmlFor={field.name}>{field.label}</label>
                      {field.type === 'select' ? (
                        <select
                          id={field.name}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleInputChange}
                          required={field.required}
                        >
                          <option value="">Select {field.label}</option>
                          {field.options.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          id={field.name}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleInputChange}
                          required={field.required}
                        />
                      )}
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="form-field full-width"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: formFields.length * 0.1 }}
                >
                  <label htmlFor="healthHistory">Health History / Conditions</label>
                  <textarea
                    id="healthHistory"
                    name="healthHistory"
                    value={formData.healthHistory}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Please mention any relevant health conditions, surgeries, or ongoing treatments..."
                  />
                </motion.div>

                <motion.div
                  className="consent-field"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: (formFields.length + 1) * 0.1 }}
                >
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleInputChange}
                      required
                    />
                    <span className="checkmark"></span>
                    I voluntarily agree to donate my organs and understand this commitment is recorded on blockchain
                  </label>
                </motion.div>

                <motion.button
                  type="submit"
                  className="submit-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!formData.consent}
                >
                  Pledge to Save Lives
                </motion.button>

                <div className="trust-note">
                  <div className="shield-icon">🛡️</div>
                  <p>Your details are safely encrypted and stored using blockchain to ensure transparency and authenticity</p>
                </div>
              </form>
            ) : (
              <motion.div
                className="success-message"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="success-icon">✓</div>
                <h3>Thank you for pledging to save a life</h3>
                <p>Your commitment has been recorded on the blockchain. You've taken a heroic step towards giving someone another chance.</p>
                <motion.button
                  className="back-btn"
                  onClick={() => setIsSubmitted(false)}
                  whileHover={{ scale: 1.05 }}
                >
                  Register Another Donor
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer Quote */}
      <motion.footer
        className="page-footer"
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <p>"One decision can give someone another heartbeat."</p>
      </motion.footer>

      {/* Scroll to Top Button */}
      <motion.button
        className="scroll-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
      >
        ↑
      </motion.button>
    </div>
  );
};

export default Donor;