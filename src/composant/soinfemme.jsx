import React, { useState, useEffect } from 'react';
import './soinhomme.css';
import produit1 from '../produit/1.jpg';
import produit2 from '../produit/2.jpg';
import produit3 from '../produit/3.jpg';
import produit4 from '../produit/4.jpg';
import produit5 from '../produit/5.jpg';
import produit6 from '../produit/6.jpg';

const Soinfemme = () => {
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
    'Soins Visage Femme - 6 Produits',
    'Produits Cosmétiques pour Femme', 
    'Découvrez notre Gamme Beauté'
  ];

  const products = [
    {
      id: 1,
      name: 'Crème Hydratante',
      price: 45.900,
      image: produit1,
      description: 'Crème hydratante visage anti-âge',
      type: 'Visage',
      marque: 'La Roche-Posay',
      prix: 'plus-30'
    },
    {
      id: 2, 
      name: 'Sérum Vitamine C',
      price: 89.500,
      image: produit2,
      description: 'Sérum éclat et anti-taches',
      type: 'Sérum',
      marque: 'Vichy',
      prix: 'plus-50'
    },
    {
      id: 3,
      name: 'Masque Purifiant',
      price: 35.750,
      image: produit3,
      description: 'Masque argile purifiant pores',
      type: 'Masque', 
      marque: 'Avène',
      prix: 'plus-30'
    },
    {
      id: 4,
      name: 'Contour des Yeux',
      price: 55.900,
      image: produit4,
      description: 'Soin anti-cernes et anti-poches',
      type: 'Yeux',
      marque: 'Clarins',
      prix: 'plus-50'
    },
    {
      id: 5,
      name: 'Lotion Tonique',
      price: 29.900,
      image: produit5,
      description: 'Lotion tonifiante apaisante',
      type: 'Lotion',
      marque: 'Bioderma',
      prix: 'moins-30'
    },
    {
      id: 6,
      name: 'Huile Visage',
      price: 75.500,
      image: produit6,
      description: 'Huile régénérante nuit',
      type: 'Huile',
      marque: 'Nuxe',
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
    const total = parseFloat(price) * quantity;
    return total.toFixed(3);
  };

  const handleOrder = () => {
    const cartItem = {
      id: cartModal.product.id,
      name: cartModal.product.name,
      price: parseFloat(cartModal.product.price),
      image: cartModal.product.image,
      quantity: cartModal.quantity,
      totalPrice: parseFloat(calculateTotalPrice(cartModal.product.price, cartModal.quantity))
    };

    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = existingCart.findIndex(item => item.id === cartItem.id);
    
    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].quantity += cartItem.quantity;
      existingCart[existingItemIndex].totalPrice = parseFloat(calculateTotalPrice(
        existingCart[existingItemIndex].price,
        existingCart[existingItemIndex].quantity
      ));
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));

    const newTotal = existingCart.reduce((sum, item) => sum + parseFloat(item.totalPrice), 0);
    localStorage.setItem('cartTotal', newTotal.toFixed(3));

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
          {['La Roche-Posay', 'Vichy', 'Avène', 'Clarins', 'Bioderma', 'Nuxe'].map(marque => (
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
            <p className="price">{parseFloat(product.price).toFixed(3)} DT</p>
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
                  <span className="price">{parseFloat(cartModal.product.price).toFixed(3)} DT</span>
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

export default Soinfemme;
