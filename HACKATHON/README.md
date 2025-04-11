# Agir Ensemble, Maintenant - Campagne Écologique

Un site web de campagne écologique moderne et interactif visant à sensibiliser les citoyens aux enjeux environnementaux majeurs. Cette application web utilise Node.js avec Express pour le backend et une base de données SQLite pour stocker les inscriptions à la newsletter et les scores du quiz.

## Fonctionnalités

- Design responsive et moderne
- Quiz interactif "Ton Score Éco" avec sauvegarde des résultats
- Galerie d'images générées par IA
- Formulaire d'inscription à la newsletter avec stockage en base de données
- Intégration des réseaux sociaux
- Partage facile de la campagne et des résultats du quiz

## Structure du projet

```
├── index.html              # Page principale du site
├── server.js               # Point d'entrée du serveur Node.js
├── package.json            # Configuration du projet et dépendances
├── .env                    # Variables d'environnement
├── css/                    # Styles CSS
│   └── style.css
├── js/                     # Scripts JavaScript frontend
│   └── script.js
├── images/                 # Images du site
│   ├── hero-bg.jpg
│   ├── reduce-plastic.jpg
│   ├── save-energy.jpg
│   └── protect-biodiversity.jpg
├── videos/                 # Vidéos du site
├── db/                     # Configuration et modèles de la base de données
│   ├── config.js           # Configuration de Sequelize/SQLite
│   ├── models.js           # Définition des modèles de données
│   ├── init.js             # Script d'initialisation de la base de données
│   └── database.sqlite     # Fichier de base de données SQLite
├── routes/                 # Routes API
│   └── api.js              # Définition des endpoints API
└── models/                 # Modèles supplémentaires (si nécessaire)
```

## Prérequis

- Node.js (v14 ou supérieur)
- npm (v6 ou supérieur)

## Installation

1. Clonez ce dépôt
   ```
   git clone <url-du-repo>
   cd HackathonIA/HACKATHON
   ```

2. Installez les dépendances
   ```
   npm install
   ```

3. Créez un fichier `.env` à la racine du projet (s'il n'existe pas déjà)
   ```
   PORT=3001
   ```

4. Initialisez la base de données
   ```
   npm run init-db
   ```

## Lancement du projet

### Option 1 : Serveur Node.js (Backend complet)

1. Démarrez le serveur
   ```
   npm start
   ```
   Ou en mode développement avec rechargement automatique :
   ```
   npm run dev
   ```

2. Accédez à l'application dans votre navigateur
   ```
   http://localhost:3001
   ```

### Option 2 : Serveur local JavaScript

Si vous souhaitez simplement exécuter l'interface frontend sans le backend complet, vous pouvez utiliser un serveur local JavaScript :

1. Lancez le serveur avec Node.js directement
   ```
   node server
   ```

2. Accédez à l'application dans votre navigateur
   ```
   http://localhost:3001
   ```

> **Note** : Cette méthode utilise le fichier server.js à la racine du projet pour démarrer un serveur Node.js simple.

## API Endpoints

- `POST /api/newsletter/subscribe` : Inscription à la newsletter
- `POST /api/quiz/save-score` : Sauvegarde du score du quiz
- `GET /api/stats` : Récupération des statistiques (nombre d'inscrits, score moyen)

## Personnalisation

- Ajoutez vos propres images dans le dossier `images/`
- Modifiez les couleurs dans le fichier `css/style.css`
- Personnalisez les questions du quiz dans `js/script.js`
- Modifiez les modèles de données dans `db/models.js` selon vos besoins

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

## Licence

Ce projet est sous licence MIT.
