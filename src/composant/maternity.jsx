import React, { useState, useEffect } from 'react';
import './hairhomme.css';
import produit1 from '../bebe/13.jpg';
import produit2 from '../bebe/14.jpg';
import produit3 from '../bebe/15.jpg'; 
import produit4 from '../bebe/16.webp';
import produit5 from '../bebe/17.jpg';
import produit6 from '../bebe/18.jpg';
import { useNavigate } from 'react-router-dom';

const Maternity = () => {
  const navigate = useNavigate();
  const [colorTheme, setColorTheme] = useState('#ffff');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    type: [],
    marque: [],
    prix: []
  });
  const [titleIndex, setTitleIndex] = useState(0);
  const [cartModal, setCartModal] = useState({
    isOpen: false,
    product: null,
    quantity: 1,
    animation: ''
  });

  const titles = [
    'Soins Maternité - 6 Produits',
    'Produits pour Futures Mamans',
    'Découvrez notre Gamme Maternité'
  ];

  const products = [
    {
      name: 'Crème Anti-Vergetures',
      price: "45,900",
      image: produit1,
      description: 'Crème prévention vergetures grossesse',
      type: 'Soin Corps',
      marque: 'Mustela',
      prix: 'plus-30'
    },
    {
      name: 'Huile de Massage',
      price: "35,500",
      image: produit2,
      description: 'Huile massage femme enceinte',
      type: 'Massage',
      marque: 'Weleda',
      prix: 'plus-30'
    },
    {
      name: 'Coussin Allaitement',
      price: "89,750",
      image: produit3,
      description: 'Coussin de positionnement',
      type: 'Accessoire',
      marque: 'Babymoov',
      prix: 'plus-50'
    },
    {
      name: 'Gel Jambes Légères',
      price: "29,900",
      image: produit4,
      description: 'Gel rafraîchissant jambes lourdes',
      type: 'Soin Corps',
      marque: 'Klorane',
      prix: 'moins-30'
    },
    {
      name: 'Soutien-gorge Allaitement',
      price: "55,900",
      image: produit5,
      description: 'Soutien-gorge spécial allaitement',
      type: 'Lingerie',
      marque: 'Medela',
      prix: 'plus-50'
    },
    {
      name: 'Ceinture Grossesse',
      price: "49,500",
      image: produit6,
      description: 'Ceinture de maintien abdominale',
      type: 'Accessoire',
      marque: 'Anita',
      prix: 'plus-30'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let result = products;
    
    Object.keys(filters).forEach(filterKey => {
      if (filters[filterKey].length > 0) {
        result = result.filter(product => filters[filterKey].includes(product[filterKey]));
      }
    });
    
    setFilteredProducts(result);
  }, [filters]);

  useEffect(() => {
    setFilteredProducts(products);
  }, []);

  const handleFilterChange = (category, value) => {
    setFilters(prevFilters => {
      const updatedFilters = { ...prevFilters };
      if (updatedFilters[category].includes(value)) {
        updatedFilters[category] = updatedFilters[category].filter(item => item !== value);
      } else {
        updatedFilters[category] = [...updatedFilters[category], value];
      }
      return updatedFilters;
    });
  };

  const openCartModal = (product) => {
    setCartModal({
      isOpen: true,
      product,
      quantity: 1,
      animation: 'modal-slide-in'
    });
  };

  const closeCartModal = () => {
    setCartModal(prev => ({
      ...prev,
      animation: 'modal-slide-out'
    }));
    setTimeout(() => {
      setCartModal({
        isOpen: false,
        product: null,
        quantity: 1,
        animation: ''
      });
    }, 300);
  };

  const calculateTotalPrice = (price, quantity) => {
    // Remplacer la virgule par un point pour la conversion
    const numericPrice = parseFloat(price.replace(',', '.'));
    // Multiplier par la quantité et formater avec 3 décimales
    const total = (numericPrice * quantity).toFixed(3);
    // Remplacer le point par une virgule pour l'affichage
    return total.replace('.', ',');
  };

  const handleOrder = () => {
    setCartModal(prev => ({
      ...prev,
      animation: 'modal-success'
    }));
    
    // Récupérer le panier existant du localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Créer le nouvel article avec le prix total calculé
    const newItem = {
      ...cartModal.product,
      quantity: cartModal.quantity,
      totalPrice: calculateTotalPrice(cartModal.product.price, cartModal.quantity)
    };
    
    // Ajouter au panier
    const updatedCart = [...existingCart, newItem];
    
    // Sauvegarder dans localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Fermer le modal après un délai
    setTimeout(() => {
      closeCartModal();
    }, 1000);
  };

  return (
    <div className="soin-homme-container" style={{ backgroundColor: colorTheme }}>
      <h1 className="animated-title">{titles[titleIndex]}</h1>
      
      <div className="filters-section">
        <div className="filter-group">
          <h3>Type de Produit</h3>
          {['Soin Corps', 'Massage', 'Accessoire', 'Lingerie'].map(type => (
            <label key={type}>
              <input
                type="checkbox"
                checked={filters.type.includes(type)}
                onChange={() => handleFilterChange('type', type)}
              />
              {type}
            </label>
          ))}
        </div>

        <div className="filter-group">
          <h3>Marque</h3>
          {['Mustela', 'Weleda', 'Babymoov', 'Klorane', 'Medela', 'Anita'].map(marque => (
            <label key={marque}>
              <input
                type="checkbox"
                checked={filters.marque.includes(marque)}
                onChange={() => handleFilterChange('marque', marque)}
              />
              {marque}
            </label>
          ))}
        </div>

        <div className="filter-group">
          <h3>Gamme de Prix</h3>
          {['moins-20', 'moins-30', 'plus-30', 'plus-50'].map(prix => (
            <label key={prix}>
              <input
                type="checkbox"
                checked={filters.prix.includes(prix)}
                onChange={() => handleFilterChange('prix', prix)}
              />
              {prix === 'moins-20' ? 'Moins de 20 DT' :
               prix === 'moins-30' ? 'Moins de 30 DT' :
               prix === 'plus-30' ? 'Plus de 30 DT' :
               'Plus de 50 DT'}
            </label>
          ))}
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.map((product, index) => (
          <div key={index} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="description">{product.description}</p>
            <p className="price">{product.price} DT</p>
            <button 
              className="add-to-cart-btn"
              onClick={() => openCartModal(product)}
            >
              Ajouter au panier
            </button>
          </div>
        ))}
      </div>

      {cartModal.isOpen && (
        <div className={`modal ${cartModal.animation}`}>
          <div className="modal-content modern">
            <div className="modal-header">
              <h2>Ajouter au panier</h2>
              <button className="close-btn" onClick={closeCartModal}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="product-preview">
                <img 
                  src={cartModal.product.image} 
                  alt={cartModal.product.name}
                  className="product-image"
                />
                <div className="product-info">
                  <h3>{cartModal.product.name}</h3>
                  <p className="product-description">{cartModal.product.description}</p>
                </div>
              </div>
              
              <div className="price-details">
                <div className="price-row">
                  <span>Prix unitaire:</span>
                  <span className="price">{cartModal.product.price} DT</span>
                </div>
                <div className="quantity-selector">
                  <label>Quantité:</label>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => setCartModal(prev => ({
                        ...prev,
                        quantity: Math.max(1, prev.quantity - 1)
                      }))}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={cartModal.quantity}
                      onChange={(e) => setCartModal(prev => ({
                        ...prev,
                        quantity: parseInt(e.target.value) || 1
                      }))}
                    />
                    <button 
                      onClick={() => setCartModal(prev => ({
                        ...prev,
                        quantity: prev.quantity + 1
                      }))}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="price-row total">
                  <span>Prix total:</span>
                  <span className="price">
                    {calculateTotalPrice(cartModal.product.price, cartModal.quantity)} DT
                  </span>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="cancel-btn"
                onClick={closeCartModal}
              >
                Annuler
              </button>
              <button 
                className="order-btn"
                onClick={handleOrder}
              >
                Commander
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Maternity;
