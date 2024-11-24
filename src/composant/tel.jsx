import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import './tel.css';

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Sophie Martin",
      role: "Cliente Fidèle",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      text: "Une expérience exceptionnelle ! Le service client est remarquable et les produits sont d'une qualité incomparable. Je recommande vivement cette pharmacie.",
      rating: 5
    },
    {
      id: 2, 
      name: "Thomas Dubois",
      role: "Patient Régulier",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      text: "Le personnel est très professionnel et attentionné. Ils prennent le temps d'expliquer et de conseiller. C'est vraiment rassurant.",
      rating: 5
    },
    {
      id: 3,
      name: "Marie Lambert",
      role: "Nouvelle Cliente",
      image: "https://randomuser.me/api/portraits/women/3.jpg", 
      text: "J'apprécie particulièrement la diversité des produits et les conseils personnalisés. Une pharmacie moderne qui répond parfaitement à mes besoins.",
      rating: 4
    }
  ];

  useEffect(() => {
    let interval;
    if (isAutoPlay) {
      interval = setInterval(() => {
        setActiveTestimonial((prev) => 
          prev === testimonials.length - 1 ? 0 : prev + 1
        );
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlay, testimonials.length]);

  const handleDotClick = (index) => {
    setActiveTestimonial(index);
    setIsAutoPlay(false);
  };

  return (
    <div className="testimonials-container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="testimonials-header"
      >
        <h1>Témoignages de nos Clients</h1>
        <p>Découvrez ce que nos clients disent de nous</p>
      </motion.div>

      <div className="testimonials-carousel">
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeTestimonial}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="testimonial-card"
          >
            <div className="quote-icon">
              <FaQuoteLeft />
            </div>
            <div className="testimonial-content">
              <img 
                src={testimonials[activeTestimonial].image} 
                alt={testimonials[activeTestimonial].name}
                className="testimonial-image"
              />
              <div className="testimonial-text">
                <p>{testimonials[activeTestimonial].text}</p>
                <div className="rating">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <FaStar key={i} className="star-icon" />
                  ))}
                </div>
                <h3>{testimonials[activeTestimonial].name}</h3>
                <span>{testimonials[activeTestimonial].role}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="testimonial-dots">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === activeTestimonial ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="testimonials-cta"
      >
        <h2>Rejoignez nos Clients Satisfaits</h2>
        <p>Venez découvrir par vous-même la qualité de nos services</p>
        <button className="cta-button">Contactez-nous</button>
      </motion.div>
    </div>
  );
};

export default Testimonials;
