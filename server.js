// ? server.js
const express = require('express');
const db = require('./database/db');
const path = require('path');
const JsBarcode = require('jsbarcode');


const app = express();

// Middleware pour analyser le JSON dans les requêtes
app.use(express.json());

// Routes
// Users route
const scanRoute = require('./routes/scan');
app.use('/', scanRoute);

// Autres middlewares + routes...
app.use(express.static(path.join(__dirname, 'public'))); // Par ex. dossier où tu mets ton HTML

// Démarrer le serveur
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});