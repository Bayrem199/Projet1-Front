import React, { useState, useEffect } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import './contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '', 
    sujet: '',
    message: ''
  });

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateCursor = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateCursor);
    return () => window.removeEventListener('mousemove', updateCursor);
  }, []);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique d'envoi du formulaire
    console.log(formData);
  };

  return (
    <>
      <div 
        className="custom-cursor"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          transform: isHovering ? 'scale(1.5)' : 'scale(1)'
        }}
      />
      <div className="contact-container">
        <div className="contact-header">
          <h1>Contactez-Nous</h1>
          <p>Nous sommes là pour vous aider et répondre à toutes vos questions</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <FaPhone className="info-icon" />
              <h3>Téléphone</h3>
              <p>+33 1 23 45 67 89</p>
            </div>

            <div className="info-card" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <FaEnvelope className="info-icon" />
              <h3>Email</h3>
              <p>contact@votreentreprise.com</p>
            </div>

            <div className="info-card" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <FaMapMarkerAlt className="info-icon" />
              <h3>Adresse</h3>
              <p>123 Rue du Commerce<br />75001 Paris, France</p>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="nom"
                placeholder="Votre nom"
                value={formData.nom}
                onChange={handleChange}
                required
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Votre email"
                value={formData.email}
                onChange={handleChange}
                required
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="sujet"
                placeholder="Sujet"
                value={formData.sujet}
                onChange={handleChange}
                required
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            </div>

            <div className="form-group">
              <textarea
                name="message"
                placeholder="Votre message"
                value={formData.message}
                onChange={handleChange}
                required
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <FaPaperPlane className="btn-icon" />
              Envoyer le message
            </button>
          </form>
        </div>

        <div className="map-container">
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.292292615509614!3d48.85837007928746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1647856687721!5m2!1sfr!2sfr"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default Contact;
