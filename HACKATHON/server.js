require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./db/config');
const apiRoutes = require('./routes/api');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Test de connexion à la base de données
sequelize.authenticate()
    .then(() => {
        console.log('Connexion à SQLite établie avec succès.');
    })
    .catch(err => {
        console.error('Impossible de se connecter à la base de données:', err);
    });

// Routes API
app.use('/api', apiRoutes);

// Route principale
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Une erreur est survenue !');
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
