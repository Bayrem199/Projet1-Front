import React, { useState, useEffect } from 'react';
import './soinhomme.css';
import produit1 from '../produit/bambini-tasse-educative-anti-goutte.jpg';
import produit2 from '../produit/wee-baby-sucette-en-silicone-0-6m.jpg';
import produit3 from '../produit/bambini-kit-manucure-4-pieces.jpg';
import produit4 from '../produit/materna-compote-pomme-biscuit-130gr.jpg';
import produit5 from '../produit/titania-brosse-smiley-enfants.jpg';
import produit6 from '../produit/wee-baby-couches-t3-68-pieces.jpg';

const Soinbebe = () => {
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
    'Soins Bébé - 6 Produits',
    'Produits pour Bébé',
    'Découvrez notre Gamme de Soins pour Bébé'
  ];

  const products = [
    {
      id: 1,
      name: 'Tasse Éducative Anti-Goutte',
      price: 19.900,
      image: produit1,
      description: 'Tasse éducative pour bébé, anti-goutte',
      type: 'Accessoires',
      marque: 'Bambini',
      prix: 'moins-30'
    },
    {
      id: 2,
      name: 'Sucette en Silicone (0-6m)',
      price: 9.500, 
      image: produit2,
      description: 'Sucette douce pour les nouveau-nés',
      type: 'Accessoires',
      marque: 'Wee Baby',
      prix: 'moins-30'
    },
    {
      id: 3,
      name: 'Kit Manucure Bébé',
      price: 25.750,
      image: produit3, 
      description: 'Kit manucure 4 pièces pour bébé',
      type: 'Accessoires',
      marque: 'Bambini',
      prix: 'moins-30'
    },
    {
      id: 4,
      name: 'Compote Pomme Biscuit (130g)',
      price: 4.900,
      image: produit4,
      description: 'Compote bio pomme et biscuit',
      type: 'Alimentation',
      marque: 'Materna',
      prix: 'moins-30'
    },
    {
      id: 5,
      name: 'Brosse à Cheveux Smiley',
      price: 12.900,
      image: produit5,
      description: 'Brosse pour enfants avec smiley',
      type: 'Hygiène',
      marque: 'Titania',
      prix: 'moins-30'
    },
    {
      id: 6,
      name: 'Couches T3 (68 Pièces)',
      price: 39.500,
      image: produit6,
      description: 'Couches douces et absorbantes',
      type: 'Hygiène',
      marque: 'Wee Baby',
      prix: 'plus-30'
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
    return parseFloat((price * quantity).toFixed(3));
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
    
    // Check if product already exists in cart
    const existingItemIndex = existingCart.findIndex(item => item.id === cartItem.id);
    
    if (existingItemIndex !== -1) {
      // Update quantity and total price if product exists
      existingCart[existingItemIndex].quantity += cartItem.quantity;
      existingCart[existingItemIndex].totalPrice = calculateTotalPrice(
        existingCart[existingItemIndex].price,
        existingCart[existingItemIndex].quantity
      );
    } else {
      // Add new item if product doesn't exist
      existingCart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));

    // Calculate new total
    const newTotal = existingCart.reduce((sum, item) => sum + item.totalPrice, 0);
    localStorage.setItem('cartTotal', newTotal.toFixed(3));

    closeCartModal();
  };

  return (
    <div className="soin-homme-container" style={{ backgroundColor: colorTheme }}>
      <h1 className="animated-title">{titles[titleIndex]}</h1>
      
      <div className="filters-section">
        <div className="filter-group">
          <h3>Type de Produit</h3>
          {['Accessoires', 'Alimentation', 'Hygiène'].map(type => (
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
          {['Bambini', 'Wee Baby', 'Materna', 'Titania'].map(marque => (
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
          {['moins-30', 'plus-30'].map(prix => (
            <label key={prix}>
              <input
                type="checkbox"
                checked={filters.prix.includes(prix)}
                onChange={() => handleFilterChange('prix', prix)}
              />
              {prix === 'moins-30' ? 'Moins de 30 DT' : 'Plus de 30 DT'}
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
            <button onClick={() => openCartModal(product)}>Ajouter au panier</button>
          </div>
        ))}
      </div>

      {cartModal.isOpen && (
        <div className={`modal ${cartModal.animation}`}>
          <div className="modal-content">
            <h2>Ajouter au panier</h2>
            <div className="modal-body">
              <img 
                src={cartModal.product.image} 
                alt={cartModal.product.name}
                className="modal-image"
              />
              <h3>{cartModal.product.name}</h3>
              <p>{cartModal.product.description}</p>
              
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

export default Soinbebe;
