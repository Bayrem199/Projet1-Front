import React from 'react';
import './About.css';
import { FaHospital, FaUserMd, FaAward, FaHandHoldingMedical, FaHeartbeat, FaStethoscope, FaUserShield } from 'react-icons/fa';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>Votre Pharmacie Paramédicale de Confiance</h1>
        <p className="header-subtitle">
          Excellence, Innovation et Expertise à Votre Service Depuis Plus de 20 Ans
        </p>
      </div>

      <div className="about-content">
        <div className="mission-section">
          <h2>Notre Engagement</h2>
          <p>
            En tant que leader dans le domaine paramédical, nous nous distinguons par notre 
            engagement inébranlable envers l'excellence et l'innovation. Notre équipe d'experts 
            qualifiés s'engage quotidiennement à fournir des solutions médicales de pointe, 
            adaptées aux besoins spécifiques de chaque patient.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <FaHospital className="feature-icon" />
            <h3>Infrastructure Moderne</h3>
            <p>Équipements de dernière génération et technologies médicales avancées</p>
          </div>

          <div className="feature-card">
            <FaUserMd className="feature-icon" />
            <h3>Expertise Médicale</h3>
            <p>Professionnels certifiés avec plus de 15 ans d'expérience</p>
          </div>

          <div className="feature-card">
            <FaHeartbeat className="feature-icon" />
            <h3>Soins Personnalisés</h3>
            <p>Approche sur mesure adaptée à chaque patient</p>
          </div>

          <div className="feature-card">
            <FaStethoscope className="feature-icon" />
            <h3>Diagnostic Précis</h3>
            <p>Évaluation approfondie et solutions adaptées</p>
          </div>
        </div>

        <div className="values-section">
          <h2>Notre Excellence</h2>
          <div className="values-content">
            <div className="value-item">
              <FaAward className="value-icon" />
              <h3>Certification ISO</h3>
              <p>Normes internationales de qualité respectées</p>
            </div>
            <div className="value-item">
              <FaUserShield className="value-icon" />
              <h3>Sécurité Garantie</h3>
              <p>Protocoles stricts et matériel certifié</p>
            </div>
            <div className="value-item">
              <FaHandHoldingMedical className="value-icon" />
              <h3>Support 24/7</h3>
              <p>Assistance continue et suivi personnalisé</p>
            </div>
          </div>
        </div>

        <div className="stats-section">
          <div className="stat-item">
            <h3>20+</h3>
            <p>Années d'Expérience</p>
          </div>
          <div className="stat-item">
            <h3>10,000+</h3>
            <p>Patients Satisfaits</p>
          </div>
          <div className="stat-item">
            <h3>500+</h3>
            <p>Produits Médicaux</p>
          </div>
        </div>

        <div className="contact-section">
          <h2>Prenez Rendez-vous</h2>
          <p>
            Notre équipe d'experts est à votre disposition pour une consultation personnalisée 
            et des conseils professionnels adaptés à vos besoins spécifiques.
          </p>
          <div className="contact-buttons">
            <button className="contact-button primary">Consultation Gratuite</button>
            <button className="contact-button secondary">Catalogue Produits</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
