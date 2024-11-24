import React, { useState, useEffect } from 'react';
import './soinhomme.css';
import produit1 from '../produit/ACM.jpg';
import produit2 from '../produit/DS Pharma.jpg';
import produit3 from '../produit/Ducray.jpg';
import produit4 from '../produit/FLOXIA.png';
import produit5 from '../produit/Hyfac.jpg';
import produit6 from '../produit/Titania.jpg';

const Soinhomme = () => {
  const [colorTheme, setColorTheme] = useState('#ffffff');
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
    'Soins Visage Homme - 6 Produits',
    'Produits Cosmétiques pour Homme', 
    'Découvrez notre Gamme Beauté'
  ];

  const products = [
    {
      id: 1,
      name: 'Crème Hydratante ACM',
      price: 49.000,
      image: produit1,
      description: 'Crème hydratante spéciale pour homme',
      type: 'Visage',
      marque: 'ACM',
      prix: 'plus-30'
    },
    {
      id: 2,
      name: 'Sérum Anti-âge DS Pharma', 
      price: 95.000,
      image: produit2,
      description: 'Sérum revitalisant anti-âge',
      type: 'Sérum',
      marque: 'DS Pharma',
      prix: 'plus-50'
    },
    {
      id: 3,
      name: 'Masque Purifiant Ducray',
      price: 37.500,
      image: produit3,
      description: 'Masque purifiant pour peaux grasses',
      type: 'Masque', 
      marque: 'Ducray',
      prix: 'plus-30'
    },
    {
      id: 4,
      name: 'Contour des Yeux FLOXIA',
      price: 59.900,
      image: produit4,
      description: 'Soin contour des yeux anti-fatigue',
      type: 'Yeux',
      marque: 'FLOXIA',
      prix: 'plus-50'
    },
    {
      id: 5,
      name: 'Lotion Tonique Hyfac',
      price: 32.900,
      image: produit5,
      description: 'Lotion tonifiante et purifiante',
      type: 'Lotion',
      marque: 'Hyfac',
      prix: 'moins-30'
    },
    {
      id: 6,
      name: 'Huile Visage Titania',
      price: 77.500,
      image: produit6,
      description: 'Huile régénérante pour homme',
      type: 'Huile',
      marque: 'Titania',
      prix: 'plus-50'
    }
  ];

  useEffect(() => {
    setFilteredProducts(products);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => {
      const updatedFilters = {
        ...prevFilters,
        [filterType]: prevFilters[filterType].includes(value)
          ? prevFilters[filterType].filter(item => item !== value)
          : [...prevFilters[filterType], value]
      };

      const filteredProducts = products.filter(product => {
        const typeMatch = updatedFilters.type.length === 0 || updatedFilters.type.includes(product.type);
        const marqueMatch = updatedFilters.marque.length === 0 || updatedFilters.marque.includes(product.marque);
        const prixMatch = updatedFilters.prix.length === 0 || updatedFilters.prix.includes(product.prix);
        return typeMatch && marqueMatch && prixMatch;
      });

      setFilteredProducts(filteredProducts);
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
    return (price * quantity).toFixed(3);
  };

  const handleOrder = () => {
    const cartItem = {
      id: cartModal.product.id,
      name: cartModal.product.name,
      price: cartModal.product.price,
      image: cartModal.product.image,
      quantity: cartModal.quantity,
      totalPrice: calculateTotalPrice(cartModal.product.price, cartModal.quantity)
    };

    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    existingCart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(existingCart));

    closeCartModal();
  };

  return (
    <div className="soin-homme-container" style={{ backgroundColor: colorTheme }}>
      <h1 className="animated-title">{titles[titleIndex]}</h1>
      
      <div className="filters-section">
        <div className="filter-group">
          <h3>Type de Produit</h3>
          {['Visage', 'Sérum', 'Masque', 'Yeux', 'Lotion', 'Huile'].map(type => (
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
          {['ACM', 'DS Pharma', 'Ducray', 'FLOXIA', 'Hyfac', 'Titania'].map(marque => (
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
          {['moins-30', 'plus-30', 'plus-50'].map(prix => (
            <label key={prix}>
              <input
                type="checkbox"
                checked={filters.prix.includes(prix)}
                onChange={() => handleFilterChange('prix', prix)}
              />
              {prix === 'moins-30' ? 'Moins de 30 DT' :
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
            <p className="price">{product.price.toFixed(3)} DT</p>
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
                  <span className="price">{cartModal.product.price.toFixed(3)} DT</span>
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

export default Soinhomme;
