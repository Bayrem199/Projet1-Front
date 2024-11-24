import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaGraduationCap, FaClock, FaMapMarkerAlt, FaMoneyBillWave } from 'react-icons/fa';
import './offres.css';

const Offres = () => {
  const [selectedOffer, setSelectedOffer] = useState(null);

  const offres = [
    {
      id: 1,
      titre: "Pharmacien(ne) Assistant(e)",
      description: "Nous recherchons un(e) pharmacien(ne) assistant(e) dynamique pour rejoindre notre équipe.",
      competences: [
        "Diplôme de Docteur en Pharmacie",
        "Expérience de 2 ans minimum",
        "Excellentes compétences relationnelles",
        "Maîtrise des logiciels de gestion officinale"
      ],
      type: "CDI",
      localisation: "Tunis Centre",
      salaire: "Selon profil",
      horaires: "39h/semaine"
    },
    {
      id: 2,
      titre: "Préparateur(trice) en Pharmacie",
      description: "Poste de préparateur(trice) en pharmacie pour renforcer notre équipe officinale.",
      competences: [
        "Brevet Professionnel de Préparateur",
        "Connaissance des préparations magistrales",
        "Sens du service client",
        "Rigueur et organisation"
      ],
      type: "CDD - 6 mois",
      localisation: "Sfax",
      salaire: "2200-2500 DT",
      horaires: "35h/semaine"
    },
    {
      id: 3,
      titre: "Technicien(ne) en Matériel Médical",
      description: "Nous recrutons un(e) technicien(ne) spécialisé(e) en matériel médical.",
      competences: [
        "Formation en maintenance biomédicale",
        "Expérience en SAV médical",
        "Permis B obligatoire",
        "Disponibilité pour déplacements"
      ],
      type: "CDI",
      localisation: "Sousse",
      salaire: "2800-3200 DT",
      horaires: "40h/semaine"
    }
  ];

  const handleOfferClick = (offre) => {
    setSelectedOffer(selectedOffer?.id === offre.id ? null : offre);
  };

  return (
    <div className="offres-container">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="offres-header"
      >
        <h1>Nos Offres d'Emploi</h1>
        <p>Rejoignez une équipe dynamique et passionnée</p>
      </motion.div>

      <div className="offres-grid">
        {offres.map((offre, index) => (
          <motion.div
            key={offre.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`offre-card ${selectedOffer?.id === offre.id ? 'selected' : ''}`}
            onClick={() => handleOfferClick(offre)}
          >
            <div className="offre-header">
              <h2>{offre.titre}</h2>
              <div className="offre-tags">
                <span className="tag"><FaBriefcase /> {offre.type}</span>
                <span className="tag"><FaMapMarkerAlt /> {offre.localisation}</span>
              </div>
            </div>

            <div className="offre-details">
              <p>{offre.description}</p>
              
              {selectedOffer?.id === offre.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="offre-expanded"
                >
                  <div className="competences">
                    <h3><FaGraduationCap /> Compétences requises</h3>
                    <ul>
                      {offre.competences.map((comp, i) => (
                        <li key={i}>{comp}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="infos-complementaires">
                    <p><FaClock /> Horaires: {offre.horaires}</p>
                    <p><FaMoneyBillWave /> Salaire: {offre.salaire}</p>
                  </div>

                  <button className="postuler-btn">
                    Postuler maintenant
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="contact-section"
      >
        <h2>Vous ne trouvez pas le poste qui vous correspond ?</h2>
        <p>Envoyez-nous une candidature spontanée à :</p>
        <a href="mailto:recrutement@pharmacie.com" className="contact-email">
          recrutement@pharmacie.com
        </a>
      </motion.div>
    </div>
  );
};

export default Offres;
