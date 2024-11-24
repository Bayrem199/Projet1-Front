import React, { useState, useEffect } from 'react';
import './home.css';
import photo1 from '../assets/1.jpg';
import photo2 from '../assets/2.jpg';
import photo3 from '../assets/3.jpg';
import photo4 from '../assets/4.jpg';
import brand1 from '../assets/b1.png';
import brand2 from '../assets/b2.png';
import brand3 from '../assets/b3.png';
import brand4 from '../assets/b4.png';
import brand5 from '../assets/b5.png';
import brand6 from '../assets/b6.png';
import promotionImage from '../assets/promotions.webp';
import promotionImage2 from '../assets/promotions2.webp';
import category1 from '../assets/11.png';
import category2 from '../assets/22.png';
import category3 from '../assets/33.png';
import category4 from '../assets/44.png';
import category5 from '../assets/55.png';
import category6 from '../assets/66.png';
import category7 from '../assets/77.png';
import category8 from '../assets/88.png';
import category9 from '../assets/99.png';
import category10 from '../assets/100.png';
import gem1 from '../assets/aa.jpg';
import gem2 from '../assets/bb.webp';
import gem3 from '../assets/cc.jpg';
import gem4 from '../assets/dd.jpg';
import client1 from '../assets/c1.jpg';
import client2 from '../assets/c2.PNG';
import client3 from '../assets/c3.png';
import client4 from '../assets/c4.jpg';
import giftImage from '../assets/gift.png'; // Image du cadeau

// Importation des images de package pour les informations utiles
import deliveryImage from '../assets/liv.png'; // Image de livraison
import warrantyImage from '../assets/gar.png'; // Image de garantie
import paymentImage from '../assets/sec.png'; // Image de paiement
import supportImage from '../assets/tel.png'; // Image de service client

// Importer le composant Footer
import Footer from './footer'; // Assurez-vous que le chemin est correct

const categoryDescriptions = [
  "COMPLEMENT ALIMENTAIRE",
  "VISAGE",
  "HOMME",
  "CHEVEUX",
  "CORPS",
  "HYGIENE",
  "BEBE & MAMAN",
  "MATERIEL MEDICAL",
  "BIO & NATUREL",
  "SOLAIRE",
];

const photos = [photo1, photo2, photo3, photo4];
const brands = [brand1, brand2, brand3, brand4, brand5, brand6];
const categories = [category1, category2, category3, category4, category5, category6, category7, category8, category9, category10];
const gems = [gem1, gem2, gem3, gem4];

const clients = [
  {
    name: 'Bayrem',
    image: client1,
    feedback: "Excellent service et produits de qualité. Je suis très satisfaite de mon expérience.",
    rating: 5
  },
  {
    name: 'Mere et Pere de suzi',
    image: client2,
    feedback: "Un site agréable à utiliser et des offres intéressantes sur les produits paramédicaux.",
    rating: 4
  },
  {
    name: 'Roua Fersi',
    image: client3,
    feedback: "Très satisfait des promotions et de la livraison rapide. Merci Parafendri !",
    rating: 5
  },
  {
    name: 'Suzi Fersi',
    image: client4,
    feedback: "Un large choix de produits et des prix compétitifs. Je recommande sans hésitation.",
    rating: 4
  }
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showPromo, setShowPromo] = useState(false);

  const nextSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
      setIsTransitioning(false);
    }, 500); 
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? photos.length - 1 : prevIndex - 1
      );
      setIsTransitioning(false);
    }, 500); 
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className={`banner ${isTransitioning ? 'fade' : ''}`} style={{ backgroundImage: `url(${photos[currentIndex]})` }}>
        <button className="arrow left" onClick={prevSlide}>❮</button>
        <button className="arrow right" onClick={nextSlide}>❯</button>
      </div>

      <div className="brands-section">
        <div className="brands-title">
          <h2>MARQUES</h2>
        </div>
        <div className="brands-container">
          {brands.map((brand, index) => (
            <div key={index} className="brand-circle">
              <img src={brand} alt={`Brand ${index + 1}`} className="brand-logo" />
            </div>
          ))}
        </div>
      </div>

      <div className="promotion-section">
        <img src={promotionImage} alt="Promotions" className="promotion-image" />
        <div className="promotion-text">
          <h3 style={{ color: 'green' }}>Nos Promotions</h3>
          <p>Parafendri vous propose une large gamme de produits à petits prix. Ne ratez pas nos réductions et promotions importantes sur les plus grandes marques.</p>
        </div>
      </div>

      <div className="promotion-section">
        <div className="promotion-text">
          <h3 style={{ color: 'green' }}>Produits Paramédicaux</h3>
          <p>Commandez votre matériel médical chez Parafendri. Que vous soyez professionnel de santé ou particulier, nous vous proposons une sélection de plus de 1000 références médicales de qualité au meilleur prix.</p>
        </div>
        <img src={promotionImage2} alt="Promotions 2" className="promotion-image right" />
      </div>

      <div className="categories-section">
        <h2 className="categories-title">Toutes les Catégories</h2>
        <div className="categories-container">
          {categories.map((category, index) => (
            <div key={index} className="category-item">
              <img src={category} alt={`Category ${index + 1}`} className="category-image" />
              <p className="category-description">{categoryDescriptions[index]}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="gems-section">
        <h2 className="gems-title">Les pépites à ne pas rater !</h2>
        <p>Vos achats bien-être à petits prix en Tunisie avec ces incontournables :</p>
        <div className="gems-container">
          {gems.map((gem, index) => (
            <div key={index} className="gem-item">
              <img src={gem} alt={`Gem ${index + 1}`} className="gem-image" />
            </div>
          ))}
        </div>
      </div>

      <div className="feedback-section">
        <h2 className="feedback-title">Avis des Clients</h2>
        <div className="feedback-container">
          {clients.map((client, index) => (
            <div key={index} className="feedback-item">
              <img src={client.image} alt={client.name} className="client-photo" />
              <h3>{client.name}</h3>
              <p>"{client.feedback}"</p>
              <div className="client-rating">
                {[...Array(client.rating)].map((_, i) => (
                  <span key={i} className="star filled">★</span>
                ))}
                {[...Array(5 - client.rating)].map((_, i) => (
                  <span key={i} className="star">☆</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="promo-section">
        {!showPromo ? (
          <div className="gift-section">
            <img 
              src={giftImage} 
              alt="Cadeau" 
              className="gift-image"
              onClick={() => setShowPromo(true)} 
            />
            <p className="click-to-claim">Cliquez pour réclamer votre code promo !</p>
          </div>
        ) : (
          <div className="promo-code">
            <h2>Votre code promo est: <span className="promo-highlight">PROMO10</span></h2>
            <p>Utilisez ce code lors de votre commande pour bénéficier de 10% de réduction sur votre achat !</p>
            <div className="center-button-container">
              <button className="close-promo" onClick={() => setShowPromo(false)}>Fermer</button>
            </div>
          </div>
        )}
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Home;
