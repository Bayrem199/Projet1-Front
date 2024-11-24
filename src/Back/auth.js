const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Pool } = require('pg');

// Configuration de la base de données PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Route pour l'inscription
router.post('/inscription', async (req, res) => {
  const { email, prenom, nom, motDePasse } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    const utilisateurExiste = await pool.query('SELECT * FROM utilisateurs WHERE email = $1', [email]);
    if (utilisateurExiste.rows.length > 0) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    // Hasher le mot de passe
    const motDePasseHache = await bcrypt.hash(motDePasse, 10);

    // Insérer l'utilisateur dans la base de données
    await pool.query(
      'INSERT INTO utilisateurs (email, prenom, nom, mot_de_passe) VALUES ($1, $2, $3, $4)',
      [email, prenom, nom, motDePasseHache]
    );

    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
