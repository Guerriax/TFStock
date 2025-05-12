# 🌟 **TFStock** - Gestion de Stock

**TFStock** est une application web de gestion de stock conçue pour simplifier l'ajout, la suppression, et la recherche de produits à l'aide de leurs codes-barres. Cette application permet à l'utilisateur de gérer un inventaire de produits avec une interface utilisateur moderne et intuitive.

---

## 🚀 **Fonctionnalités**

- **Ajout de produits** : Enregistrez de nouveaux produits avec des informations détaillées telles que le code-barres, la catégorie, la description, la quantité, la RAM, le CPU, le GPU, le stockage et bien plus.
- **Suppression de produits** : Supprimez un produit ou videz entièrement la base de données.
- **Recherche de produits** : Trouvez rapidement un produit par son code-barres.
- **Interface interactive** : Confirmation via des popups avant toute action critique (ajout ou suppression de produits).
- **Matériel pris en charge** : Cette api est compatible à 100% avec la plupart des **Scanner de Code-Barres en plug & play en USB** et ceux supportant les barcodes **CODE128**.
- **Système de confirmation** : Les actions critiques comme l'ajout ou la suppression de produits nécessitent une confirmation supplémentaire via des popups.
- **Gestion avancée** : Vous pouvez ajouter, modifier et supprimer des produits directement depuis l'interface utilisateur.
- **Documentation complète** : Consultez la documentation détaillée pour comprendre comment utiliser chaque fonctionnalité de manière optimale.
- **Portabilité** : Compatible avec tous les systèmes d'exploitation qui prennent en charge Node.js et MySQL.
- **LOCAL** : Utilisez cette api sur votre ordinateur personnel sans avoir besoin de serveur distant.
---

## 🛠️ **Technologies utilisées**

- **Frontend** : HTML, CSS, JavaScript
- **Backend** : Node.js, Express.js
- **Base de données** : MySQL

---

## 📦 **Installation**

### 1. **Cloner le dépôt**

Commencez par cloner le projet depuis GitHub.

```bash
git clone https://github.com/Guerriax/TFStock.git

2. Installer les dépendances

Naviguez dans le répertoire du projet et installez les dépendances nécessaires.

cd TFStock
npm install

3. Configurer la base de données

    Créez une base de données MySQL.

    Importez le fichier produits.sql pour créer la table produits.

    Mettez à jour les informations de connexion à la base de données dans server.js.

4. Lancer le serveur

Démarrez le serveur Node.js.

node server.js

5. Accéder à l'application

Ouvrez votre navigateur et accédez à l'application à l'adresse suivante :

http://localhost:4000
```
📁 Structure du projet
```
TFStock/
├── .idea/                  # Fichiers de configuration IDE
├── database/               # Scripts de base de données (SQL)
├── public/                 # Fichiers statiques (HTML, CSS, JS)
├── routes/                 # Définition des routes Express
├── produits.sql            # Script SQL pour la création de la table produits
├── server.js               # Serveur Node.js
├── package.json            # Fichier de configuration npm
└── README.md               # Documentation du projet
```

📝 Exemples de requêtes API
1. Ajouter un produit

    Méthode : POST

    URL : /create-product

    Body (exemple) :
```json
{
  "barcode": "123456789",
  "categorie": "Ordinateur",
  "description": "Ordinateur portable avec 16Go de RAM",
  "quantite": 10,
  "ram_size": "16Go",
  "ram_type": "DDR4",
  "stockage_type": "SSD",
  "stockage_size": "512Go",
  "cpu": "Intel i7",
  "gpu": "NVIDIA GTX 1650",
  "rgb": true
}
```

2. Supprimer un produit

    Méthode : POST

    URL : /delete-product

    Body (exemple) :
```json
{
  "barcode": "123456789"
}
```

💻 Contribuer

Les contributions sont les bienvenues ! Si vous souhaitez améliorer ce projet, veuillez suivre les étapes ci-dessous :

    Forkez le projet.

    Créez une branche pour votre fonctionnalité (git checkout -b feature/nom-de-la-fonctionnalité).

    Commitez vos modifications (git commit -am 'Ajout d’une nouvelle fonctionnalité').

    Poussez votre branche (git push origin feature/nom-de-la-fonctionnalité).

    Ouvrez une Pull Request.

📄 Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus d'informations.

📢 Remerciements

Merci d'avoir consulté ce projet ! Si vous avez des questions ou des suggestions, n'hésitez pas à ouvrir une issue ou à contacter les contributeurs.

Auteur : Guerriax
Date de mise à jour : Mai 2025
