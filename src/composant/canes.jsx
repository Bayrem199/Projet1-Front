import React, { useState, useEffect } from 'react';
import './hairhomme.css';
import produit1 from '../medical/1111.jpg';
import produit2 from '../medical/2222.jpg';
import produit3 from '../medical/3333.jpg';
import produit4 from '../medical/4444.jpg';
import produit5 from '../medical/5555.jpg';
import produit6 from '../medical/6666.jpg';

const Canes = () => {
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
    'Cannes et Béquilles - 6 Produits',
    'Aides à la Marche',
    'Découvrez notre Gamme de Cannes'
  ];

  const products = [
    {
      name: 'Canne Simple',
      price: "35,900",
      image: produit1,
      description: 'Canne de marche classique ajustable',
      type: 'Canne',
      marque: 'Drive Medical',
      prix: 'plus-30'
    },
    {
      name: 'Béquilles Axillaires', 
      price: "45,500",
      image: produit2,
      description: 'Paire de béquilles réglables',
      type: 'Béquilles',
      marque: 'Invacare',
      prix: 'plus-30'
    },
    {
      name: 'Canne Quadripode',
      price: "52,750", 
      image: produit3,
      description: 'Canne à 4 pieds stable',
      type: 'Canne',
      marque: 'Thuasne',
      prix: 'plus-50'
    },
    {
      name: 'Béquilles Canadiennes',
      price: "28,900",
      image: produit4,
      description: 'Béquilles avant-bras ergonomiques',
      type: 'Béquilles',
      marque: 'Herdegen',
      prix: 'moins-30'
    },
    {
      name: 'Canne Pliante',
      price: "42,900",
      image: produit5,
      description: 'Canne pliable en 4 parties',
      type: 'Canne',
      marque: 'Drive Medical',
      prix: 'plus-30'
    },
    {
      name: 'Canne Siège',
      price: "65,500",
      image: produit6,
      description: 'Canne avec siège intégré',
      type: 'Canne',
      marque: 'Invacare',
      prix: 'plus-50'
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
    const numericPrice = parseFloat(price.replace(',', '.'));
    return (numericPrice * quantity).toFixed(3).replace('.', ',');
  };

  const handleOrder = () => {
    const cartItem = {
      ...cartModal.product,
      quantity: cartModal.quantity,
      totalPrice: calculateTotalPrice(cartModal.product.price, cartModal.quantity)
    };

    // Récupérer le panier existant
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Ajouter le nouvel article
    existingCart.push(cartItem);
    
    // Sauvegarder dans localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));

    setCartModal(prev => ({
      ...prev,
      animation: 'modal-success'
    }));

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
          {['Canne', 'Béquilles'].map(type => (
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
          {['Drive Medical', 'Invacare', 'Thuasne', 'Herdegen'].map(marque => (
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

export default Canes;
