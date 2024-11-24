import React, { useState, useEffect } from 'react';
import './soinhomme.css';
import produit1 from '../produit/7.jpg';
import produit2 from '../produit/8.png';
import produit3 from '../produit/9.jpg';
import produit4 from '../produit/10.jpg';
import produit5 from '../produit/11.png';
import produit6 from '../produit/12.jpg';

const Soinfemme = () => {
  const [colorTheme, setColorTheme] = useState('#ffffff');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    type: [],
    marque: [],
    prix: []
  });
  const [titleIndex, setTitleIndex] = useState(0);
  const [cartModal, setCartModal] = useState({ isOpen: false, product: null, quantity: 1, animation: '' });

  const titles = [
    'Matériel Médical - 6 Produits',
    'Équipement Médical de Qualité',
    'Découvrez notre Matériel Médical'
  ];

  const products = [
    {
      id: 1,
      name: 'Tensiomètre Électronique',
      price: 120.000,
      image: produit1,
      description: 'Tensiomètre de bras automatique',
      type: 'Équipement',
      marque: 'Omron',
      prix: 'plus-100'
    },
    {
      id: 2,
      name: 'Thermomètre Infrarouge',
      price: 45.000,
      image: produit2,
      description: 'Thermomètre sans contact rapide et précis',
      type: 'Équipement',
      marque: 'Braun',
      prix: 'moins-50'
    },
    {
      id: 3,
      name: 'Oxymètre de Pouls',
      price: 65.000,
      image: produit3,
      description: 'Oxymètre de pouls pour mesurer la saturation en oxygène',
      type: 'Équipement',
      marque: 'Beurer',
      prix: 'plus-50'
    },
    {
      id: 4,
      name: 'Stéthoscope Littmann',
      price: 180.000,
      image: produit4,
      description: 'Stéthoscope de haute qualité pour professionnels',
      type: 'Diagnostic',
      marque: '3M Littmann',
      prix: 'plus-100'
    },
    {
      id: 5,
      name: 'Fauteuil Roulant Pliable',
      price: 450.000,
      image: produit5,
      description: 'Fauteuil roulant léger et compact',
      type: 'Mobilité',
      marque: 'Invacare',
      prix: 'plus-200'
    },
    {
      id: 6,
      name: 'Gants Médicaux',
      price: 15.000,
      image: produit6,
      description: 'Gants en nitrile pour une protection optimale',
      type: 'Protection',
      marque: 'Sempermed',
      prix: 'moins-50'
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
    setCartModal({ isOpen: true, product, quantity: 1, animation: 'fade-in' });
  };

  const closeCartModal = () => {
    setCartModal(prev => ({ ...prev, animation: 'fade-out' }));
    setTimeout(() => {
      setCartModal({ isOpen: false, product: null, quantity: 1, animation: '' });
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
      totalPrice: parseFloat(calculateTotalPrice(cartModal.product.price, cartModal.quantity))
    };

    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if product already exists in cart
    const existingItemIndex = existingCart.findIndex(item => item.id === cartItem.id);
    
    if (existingItemIndex !== -1) {
      // Update quantity and total price if product exists
      existingCart[existingItemIndex].quantity += cartItem.quantity;
      existingCart[existingItemIndex].totalPrice = parseFloat(calculateTotalPrice(
        existingCart[existingItemIndex].price,
        existingCart[existingItemIndex].quantity
      ));
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
          {['Équipement', 'Diagnostic', 'Mobilité', 'Protection'].map(type => (
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
          {['Omron', 'Braun', 'Beurer', '3M Littmann', 'Invacare', 'Sempermed'].map(marque => (
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
          {['moins-50', 'plus-50', 'plus-100', 'plus-200'].map(prix => (
            <label key={prix}>
              <input
                type="checkbox"
                checked={filters.prix.includes(prix)}
                onChange={() => handleFilterChange('prix', prix)}
              />
              {prix === 'moins-50' ? 'Moins de 50 DT' :
               prix === 'plus-50' ? 'Plus de 50 DT' :
               prix === 'plus-100' ? 'Plus de 100 DT' :
               'Plus de 200 DT'}
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

export default Soinfemme;
