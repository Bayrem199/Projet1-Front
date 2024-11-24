import React from 'react';
import './Team.css';
import { motion } from 'framer-motion';
import { FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import sarah from '../assets/p5.jpg';
import jean from '../assets/p2.jpg';
import marie from '../assets/p3.jpg';
import thomas from '../assets/p4.jpg';

const Team = () => {
  const navigate = useNavigate();

  const teamMembers = [
    {
      id: 1,
      name: "Dr. Sarah Martin", 
      role: "Pharmacienne en Chef",
      image: sarah,
      bio: "Spécialiste en pharmacologie clinique avec plus de 15 ans d'expérience",
      linkedin: "https://linkedin.com/in/sarah-martin",
      twitter: "https://twitter.com/drsarahmartin",
      email: "sarah.martin@pharmacie.com"
    },
    {
      id: 2,
      name: "Jean Dubois",
      role: "Préparateur en Pharmacie", 
      image: jean,
      bio: "Expert en préparations magistrales et conseils personnalisés",
      linkedin: "https://linkedin.com/in/jean-dubois",
      twitter: "https://twitter.com/jeandubois",
      email: "jean.dubois@pharmacie.com"
    },
    {
      id: 3,
      name: "Bayrem Bhibah",
      role: "Responsable Matériel Médical",
      image: marie,
      bio: "Spécialisée dans l'équipement médical et l'assistance technique",
      linkedin: "https://linkedin.com/in/marie-laurent", 
      twitter: "https://twitter.com/marielaurent",
      email: "marie.laurent@pharmacie.com"
    },
    {
      id: 4,
      name: "Roua Fersi",
      role: "Conseillère Paramédicale",
      image: thomas,
      bio: "Experte en solutions paramédicales et accompagnement patient",
      linkedin: "https://linkedin.com/in/roua-fersi",
      twitter: "https://twitter.com/rouafersi", 
      email: "roua.fersi@pharmacie.com"
    }
  ];

  return (
    <div className="team-container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="team-header"
      >
        <h1>Notre Équipe d'Experts</h1>
        <p>Une équipe passionnée et qualifiée à votre service</p>
      </motion.div>

      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="team-member-card"
          >
            <div className="member-image-container">
              <img src={member.image} alt={member.name} className="member-image" />
              <div className="member-social">
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="social-icon" />
                </a>
                <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                  <FaTwitter className="social-icon" />
                </a>
                <a href={`mailto:${member.email}`}>
                  <FaEnvelope className="social-icon" />
                </a>
              </div>
            </div>
            <div className="member-info">
              <h3>{member.name}</h3>
              <h4>{member.role}</h4>
              <p>{member.bio}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="team-cta"
      >
        <h2>Rejoignez Notre Équipe</h2>
        <p>Nous sommes toujours à la recherche de talents passionnés</p>
        <button className="join-team-button" onClick={() => navigate('/offres')}>Voir Nos Offres</button>
      </motion.div>
    </div>
  );
};

export default Team;
