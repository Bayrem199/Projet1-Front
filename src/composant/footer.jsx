import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaPhoneAlt, FaFax, FaEnvelope, FaMapMarkerAlt, FaArrowUp } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import './footer.css';
import logo from '../assets/logo.png';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const handleScroll = useCallback(() => {
    setShowScrollTop(window.pageYOffset > 300);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulation d'une API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  const socialIconVariants = {
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: { duration: 0.5 }
    },
    tap: { scale: 0.9 }
  };

  return (
    <motion.footer
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className="footer"
    >
      <div className="footer-content">
        <motion.div className="footer-info" variants={itemVariants}>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Contactez-Nous
          </motion.h2>
          <motion.div className="contact-details" variants={itemVariants}>
            <motion.p whileHover={{ x: 10 }}>
              <strong>Bibou Medical</strong>
            </motion.p>
            <motion.p whileHover={{ x: 10 }}>
              <FaMapMarkerAlt className="icon-pulse" /> 
              Av. Habib Bourguiba Bab Mateur 7061, Riadh el Andalous, Ariana
            </motion.p>
            <motion.p whileHover={{ x: 10 }}>
              <FaPhoneAlt className="icon-pulse" /> 
              Téléphone : 26 231 436 - 90 160 918
            </motion.p>
            <motion.p whileHover={{ x: 10 }}>
              <FaFax className="icon-pulse" /> 
              Fax : 71 124 040
            </motion.p>
            <motion.p whileHover={{ x: 10 }}>
              <FaEnvelope className="icon-pulse" /> 
              Email : <a href="mailto:contact@bibou-medical.com">contact@bibou-medical.com</a>
            </motion.p>
          </motion.div>
        </motion.div>

        <motion.div 
          className="newsletter"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <h3>Inscrivez-vous à notre newsletter</h3>
          <AnimatePresence>
            {isSubscribed ? (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="success-message"
              >
                Merci pour votre inscription!
              </motion.div>
            ) : (
              <motion.form 
                className="newsletter-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre email"
                  required
                  whileFocus={{ scale: 1.02 }}
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  S'inscrire
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div 
          className="social-icons"
          variants={itemVariants}
        >
          {[
            { icon: FaFacebook, link: "https://www.facebook.com" },
            { icon: FaInstagram, link: "https://www.instagram.com" },
            { icon: FaTwitter, link: "https://twitter.com" },
            { icon: FaLinkedin, link: "https://www.linkedin.com" }
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              variants={socialIconVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <social.icon />
            </motion.a>
          ))}
        </motion.div>

        <motion.div 
          className="footer-logo"
          variants={itemVariants}
          whileHover={{ scale: 1.1 }}
        >
          <img src={logo} alt="Logo Bibou Medical" />
        </motion.div>
      </div>

      <motion.div 
        className="footer-bottom"
        variants={itemVariants}
      >
        <p>© {new Date().getFullYear()} Bibou Medical. Tous droits réservés.</p>
        <motion.div 
          className="footer-links"
          variants={itemVariants}
        >
          {['À Propos', 'Services', 'Contact'].map((link, index) => (
            <motion.a
              key={index}
              href={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
              whileHover={{ scale: 1.1, color: '#ffd700' }}
              whileTap={{ scale: 0.95 }}
            >
              {link}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="scroll-top-button"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.footer>
  );
};

export default Footer;
