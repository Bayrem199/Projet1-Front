import React, { useState, useEffect } from 'react';
import './navbar.css';
import { FaHome, FaInfoCircle, FaUsers, FaCommentDots, FaPhone, FaSearch, FaSignInAlt, FaShoppingCart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isServicesDropdownVisible, setIsServicesDropdownVisible] = useState(false);
  const [isMenCareDropdownVisible, setIsMenCareDropdownVisible] = useState(false);
  const [isBabyCareDropdownVisible, setIsBabyCareDropdownVisible] = useState(false);
  const [isWomenCareDropdownVisible, setIsWomenCareDropdownVisible] = useState(false);
  const [isMedicalDropdownVisible, setIsMedicalDropdownVisible] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  const navigate = useNavigate();

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    setShowNavbar(currentScrollY <= lastScrollY);
    setLastScrollY(currentScrollY);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLoginToggle = () => {
    setIsLoginVisible(!isLoginVisible);
  };

  const handleSignUp = () => {
    window.location.href = '/signup';
  };

  const handleCartToggle = () => {
    // Récupérer le total du panier depuis le localStorage
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setCartTotal(total);
    setIsCartVisible(!isCartVisible);
  };

  const handleViewCart = () => {
    setIsCartVisible(false);
    navigate('/cart');
  };

  const handleServicesDropdownToggle = () => {
    setIsServicesDropdownVisible(!isServicesDropdownVisible);
  };

  const handleMenCareDropdownToggle = () => {
    setIsMenCareDropdownVisible(!isMenCareDropdownVisible);
  };

  const handleBabyCareDropdownToggle = () => {
    setIsBabyCareDropdownVisible(!isBabyCareDropdownVisible);
  };

  const handleWomenCareDropdownToggle = () => {
    setIsWomenCareDropdownVisible(!isWomenCareDropdownVisible);
  };

  const handleMedicalDropdownToggle = () => {
    setIsMedicalDropdownVisible(!isMedicalDropdownVisible);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // Écouter les changements dans le localStorage pour le panier
  useEffect(() => {
    const handleStorageChange = () => {
      const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      setCartTotal(total);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <nav className={`navbar ${showNavbar ? 'visible' : 'hidden'}`}>
      <div className="navbar-logo-container">
        <img src={logo} alt="Logo" className="navbar-logo" />
      </div>
      <ul className="navbar-menu">
        <li className="navbar-item">
          <Link to="/" className="navbar-link"><FaHome /> Accueil</Link>
        </li>
        <li className="navbar-item" onMouseEnter={handleServicesDropdownToggle} onMouseLeave={handleServicesDropdownToggle}>
          <span className="navbar-link"><FaInfoCircle /> Services</span>
          <div className={`services-dropdown ${isServicesDropdownVisible ? 'show' : ''}`}>
            <Link to="/hair-care1" className="services-dropdown-item" onMouseEnter={handleMenCareDropdownToggle} onMouseLeave={handleMenCareDropdownToggle}>
              Soin Homme
              <div className={`men-care-dropdown ${isMenCareDropdownVisible ? 'show' : ''}`}>
                <Link to="/hair-care" className="men-care-dropdown-item">Soin cheveux homme</Link>
                <Link to="/face-care" className="men-care-dropdown-item">Soin visage homme</Link>
                <Link to="/body-care" className="men-care-dropdown-item">Soin corps homme</Link>
                <Link to="/deodorant" className="men-care-dropdown-item">Déodorant homme</Link>
              </div>
            </Link>
            <Link to="/baby-maternity" className="services-dropdown-item" onMouseEnter={handleBabyCareDropdownToggle} onMouseLeave={handleBabyCareDropdownToggle}>
              Bébé & Maternité
              <div className={`baby-care-dropdown ${isBabyCareDropdownVisible ? 'show' : ''}`}>
                <Link to="/baby-care" className="baby-care-dropdown-item">Soins Bébé</Link>
                <Link to="/puericulture" className="baby-care-dropdown-item">Puériculture</Link>
                <Link to="/maternity" className="baby-care-dropdown-item">Maternité</Link>
              </div>
            </Link>
            <Link to="/womens-care" className="services-dropdown-item" onMouseEnter={handleWomenCareDropdownToggle} onMouseLeave={handleWomenCareDropdownToggle}>
              Soin Femme
              <div className={`women-care-dropdown ${isWomenCareDropdownVisible ? 'show' : ''}`}>
                <Link to="/face-care2" className="women-care-dropdown-item">Soin Visage</Link>
                <Link to="/makeup" className="women-care-dropdown-item">Maquillage</Link>
                <Link to="/beauty-accessories" className="women-care-dropdown-item">Accessoires de beauté</Link>
                <Link to="/body-care2" className="women-care-dropdown-item">Corps</Link>
              </div>
            </Link>
            <Link to="/medical-equipment" className="services-dropdown-item" onMouseEnter={handleMedicalDropdownToggle} onMouseLeave={handleMedicalDropdownToggle}>
              Matériel Médical
              <div className={`medical-dropdown ${isMedicalDropdownVisible ? 'show' : ''}`}>
                <Link to="/wheelchair" className="medical-dropdown-item">Chaise roulante</Link>
                <Link to="/measuring-devices" className="medical-dropdown-item">Appareils de mesure</Link>
                <Link to="/hygiene" className="medical-dropdown-item">Hygiène</Link>
                <Link to="/canes" className="medical-dropdown-item">Cannes et béquilles</Link>
              </div>
            </Link>
          </div>
        </li>
        <li className="navbar-item">
          <Link to="/about" className="navbar-link"><FaUsers /> À Propos</Link>
        </li>
        <li className="navbar-item">
          <Link to="/team" className="navbar-link"><FaCommentDots /> Équipe</Link>
        </li>
        <li className="navbar-item">
          <Link to="/testimonials" className="navbar-link"><FaPhone /> Témoignages</Link>
        </li>
        <li className="navbar-item">
          <Link to="/contact" className="navbar-link"><FaPhone /> Contact</Link>
        </li>
      </ul>

      {/* Barre de recherche */}
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Rechercher des services..." 
          value={searchTerm} 
          onChange={handleSearchChange} 
          className="search-input"
        />
        <button className="search-button"><FaSearch /></button>
      </div>

      {/* Bouton de connexion */}
      <button className="login-button" onClick={handleLoginToggle}>
        <FaSignInAlt /> Connexion
      </button>

      {/* Icône du panier */}
      <button className="cart-button" onClick={handleCartToggle}>
        <FaShoppingCart /> Panier
      </button>

      {/* Fenêtre contextuelle du panier */}
      {isCartVisible && (
        <div className="cart-popup">
          <h3>Total: {cartTotal.toFixed(3)} TND</h3>
          <Link to="/cart" className="view-cart-button" onClick={handleViewCart}>Voir le panier</Link>
          <button className="cart-close" onClick={handleCartToggle}>Fermer</button>
        </div>
      )}

      {/* Formulaire de connexion */}
      {isLoginVisible && (
        <div className="login-form">
          <h3>Connexion</h3>
          <input type="text" placeholder="Email" className="login-input" />
          <input type="password" placeholder="Mot de passe" className="login-input" />
          <button className="login-submit">Se connecter</button>
          <button className="signup-button" onClick={handleSignUp}>S'inscrire</button>
          <button className="login-close" onClick={handleLoginToggle}>Fermer</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
