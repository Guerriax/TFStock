// ? db.js
const mysql = require('mysql2');


// Création de la connexion MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',    // Remplace par ton utilisateur
    password: '',    // Remplace par ton mot de passe MySQL
    database: 'tfstock_db'  // Remplace par le nom de ta base de données
});

// Vérification de la connexion
db.connect(err => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err);
    } else {
        console.log('Connecté à la base de données MySQL');
    }
});

module.exports = db;