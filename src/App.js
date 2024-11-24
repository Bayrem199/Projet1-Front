// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './composant/navbar.jsx'; // Mise à jour du chemin
import Home from './composant/home.jsx'; // Importer le composant Home
import Signup from './composant/signup.jsx'; // Importer le composant Signup
import SoinHomme from './composant/soinhomme.jsx'; // Importer le composant Soin Homme
import Routebebe from './composant/bebe.jsx';
import Soinfemme from './composant/soinfemme.jsx';
import Matrilmedicale from './composant/matrielmedicale.jsx';
import Hairhomme from './composant/hairhomme.jsx';
import AAbout from './composant/About.jsx';
import Equipe from './composant/Team.jsx';
import Tels from './composant/tel.jsx';
import Contacts from './composant/contact.jsx';
import SoinvisageH from './composant/soinvisageh.jsx';
import SoincorpsH from './composant/soincorpsh.jsx';
import DeoH from './composant/deo.jsx';
import Bebe from './composant/soinsbebe.jsx';
import Pueric from './composant/puericulture.jsx';
import Mat from './composant/maternity.jsx';
import SoinvisageF from './composant/soinvisageF.jsx';
import MakupF from './composant/makupF.jsx';
import Accessoir from './composant/accessories.jsx';
import Corps from './composant/corpsF.jsx';
import ChaiseR from './composant/chaise.jsx';
import Appareil1 from './composant/Appareils.jsx';
import Hygi from './composant/hygiene.jsx';
import Canes from './composant/canes.jsx';
import Offres from './composant/offres.jsx';
import Cart from './composant/cart.jsx';
import './App.css'; // Votre fichier CSS pour l'application

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} /> {/* Route pour la page d'accueil */}
          <Route path="/signup" element={<Signup />} /> {/* Route pour la page d'inscription */}
          <Route path="/hair-care1" element={<SoinHomme />} /> {/* Route pour la page Soin Homme */}
          <Route path="/baby-maternity" element={<Routebebe />} /> {/* Route pour la page bebe*/}
          <Route path="/womens-care" element={<Soinfemme />} /> 
          <Route path="/medical-equipment" element={<Matrilmedicale />} />
          <Route path="/hair-care" element={<Hairhomme />} />
          <Route path="/about" element={<AAbout />} />
          <Route path="/team" element={<Equipe />} />
          <Route path="/testimonials" element={<Tels />} />
          <Route path="/contact" element={<Contacts />} />
          <Route path="/face-care" element={<SoinvisageH />} />
          <Route path="/body-care" element={<SoincorpsH />} />
          <Route path="/deodorant" element={<DeoH />} />
          <Route path="/baby-care" element={<Bebe />} />
          <Route path="/puericulture" element={<Pueric />} />
          <Route path="/maternity" element={<Mat />} />
          <Route path="/face-care2" element={<SoinvisageF />} />
          <Route path="/makeup" element={<MakupF />} />
          <Route path="/beauty-accessories" element={<Accessoir />} />
          <Route path="/body-care2" element={<Corps />} />
          <Route path="/wheelchair" element={<ChaiseR />} />
          <Route path="/measuring-devices" element={<Appareil1 />} />
          <Route path="/hygiene" element={<Hygi />} />
          <Route path="/canes" element={<Canes />} />
          <Route path="/offres" element={<Offres />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
