// scan.js
const express = require('express');
// Crée une nouvelle instance de router
const router = express.Router();
const db = require('../database/db');

// Route POST pour ajouter ou retirer un produit
router.post('/update-stock', (req, res) => {
    const { barcode, quantity, action } = req.body;

    if (!barcode || !quantity || !action) {
        return res.status(400).send('Tous les champs sont requis.');
    }

    // Vérifie si le produit existe déjà
    db.query('SELECT * FROM produits WHERE barcode = ?', [barcode], (err, result) => {
        if (err) {
            return res.status(500).send('Erreur dans la requête');
        }

        if (result.length === 0) {
            return res.status(404).send('Produit non trouvé');
        }

        const product = result[0];
        let newQuantity = product.quantite;

        // Calcul de la nouvelle quantité en fonction de l'action
        if (action === 'add') {
            newQuantity += parseInt(quantity);
        } else if (action === 'remove') {
            newQuantity -= parseInt(quantity);
            if (newQuantity < 0) {
                return res.status(400).send('Le stock ne peut pas être négatif.');
            }
        } else {
            return res.status(400).send('Action invalide. Utilisez "add" ou "remove".');
        }

        // Met à jour la quantité dans la base de données
        db.query('UPDATE produits SET quantite = ?, modifier_le = CURRENT_TIMESTAMP WHERE barcode = ?', [newQuantity, barcode], (err, result) => {
            if (err) {
                return res.status(500).send('Erreur lors de la mise à jour du stock');
            }

            // Si la quantité devient 0, supprime le produit de la base de données
            if (newQuantity === 0) {
                db.query('DELETE FROM produits WHERE barcode = ?', [barcode], (err, result) => {
                    if (err) {
                        return res.status(500).send('Erreur lors de la suppression du produit');
                    }

                    return res.status(200).json({
                        success: true,
                        newQuantity: 0,  // Nouvelle quantité est 0
                        message: 'Produit supprimé du stock (quantité zéro).',
                        id: barcode  // Retourne le barcode ou un id pour identifier le produit
                    });
                });
            } else {
                return res.status(200).json({
                    success: true,
                    newQuantity: newQuantity,
                    message: `Stock mis à jour. Nouvelle quantité : ${newQuantity}`,
                    id: result.insertId
                });
            }
        });
    });
});

router.post('/check-product', (req, res) => {
    const { barcode } = req.body;

    if (!barcode) {
        return res.status(400).json({ error: 'Code-barres requis.' });
    }

    db.query('SELECT * FROM produits WHERE barcode = ?', [barcode], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur de base de données.' });
        }

        if (result.length === 0) {
            // Produit non trouvé
            return res.json({
                exists: false,
                nom: null,
                description: null,
                categorie: null,
                quantite: 0
            });
        }

        const produit = result[0];

        res.json({
            exists: true,
            barcode: produit.barcode,
            categorie: produit.categorie,
            description: produit.description,
            quantite: produit.quantite
        });
    });
});

router.post('/create-product', (req, res) => {
    const { barcode, categorie, description, quantite} = req.body;

    if(!barcode || !categorie || !description || !quantite){
        return res.status(400).json({error:'Plusieurs champs manquant'})
    }

    console.log("Quantité reçue côté backend:", quantite);  // Vérifie ici

    if(!barcode) {
        return res.status(400).json({error:'Code-barres manquant'})
    }

    if(!categorie) {
        return res.status(400).json({error:'Nom manquant'})
    }

    if(!description) {
        return res.status(400).json({error:'Description manquante'})
    }

    if(!quantite){
        return res.status(400).json({error:'Quantité manquante'})
    }

    db.query('INSERT INTO produits (barcode, categorie, description, quantite) VALUES (?, ?, ?, ?)', [barcode, categorie, description, quantite], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Erreur de base de données.' });
            }

            res.status(201).json({
                success: true,  // Change ici pour `success: true`
                message: 'Produit créé avec succès',
                id: result.insertId
            });
        }
    );
})

// Route pour récupérer tous les produits
router.get('/get-products', (req, res) => {
    db.query('SELECT * FROM produits', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
        }
        res.status(200).json(results);  // Renvoie tous les produits
    });
});


module.exports = router;