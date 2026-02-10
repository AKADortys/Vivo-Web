# Vivo Web

Ce projet est une application web développée avec [Angular](https://github.com/angular/angular-cli). Il s'agit d'un travail de fin d'études (TFE) visant à fournir une interface de gestion de commandes et un tableau de bord pour les clients et administrateurs.

## 🚀 Fonctionnalités Principales

*   **Interface Client** :
    *   Navigation intuitive par catégories (Plats, Desserts, Boissons, Divers).
    *   Visualisation des produits et menus.
    *   Tableau de bord personnel avec statistiques (nombre de commandes, dépenses, statut du compte...).
*   **Administration** :
    *   Gestion des utilisateurs et supervision.
    *   Suivi des commandes en temps réel.
*   **Authentification & Sécurité** :
    *   Système de connexion sécurisé.
    *   Protection des routes via des **Guards** (Vérification de token, Rôle Admin).
    *   **Intercepteurs HTTP** pour la gestion automatique des tokens d'authentification (JWT).

##  Backend & API

Cette application **frontend** est conçue pour fonctionner de concert avec une API REST **Express**.
Le code source du backend est disponible ici : 👉 [TFM-SGBD (Express API)](https://github.com/AKADortys/TFM-SGBD).

⚠️ **Important** : Assurez-vous que l'API est lancée localement (par défaut sur le port 3000) pour que l'application puisse récupérer les données (produits, commandes, utilisateurs...).

## 🛠 Technologies et Librairies

Ce projet s'appuie sur un stack technique moderne :

*   **Core** : [Angular](https://angular.io/) (Framework SPA).
*   **Design & UI** :
    *   [Bootstrap 5](https://getbootstrap.com/) : Framework CSS pour le responsive design et les composants graphiques.
    *   [Bootstrap Icons](https://icons.getbootstrap.com/) : Bibliothèque d'icônes vectorielles.
*   **Expérience Utilisateur** :
    *   [SweetAlert2](https://sweetalert2.github.io/) : Pour l'affichage de popups et d'alertes dynamiques et esthétiques.
*   **Programmation Réactive** :
    *   [RxJS](https://rxjs.dev/) : Gestion des flux de données asynchrones (Observables).
*   **Documentation** :
    *   [Compodoc](https://compodoc.app/) : Outil de génération de documentation technique pour applications Angular.

## 📦 Installation et Démarrage

### Prérequis
Assurez-vous d'avoir **Node.js** et **npm** installés sur votre machine.

### Installation des dépendances
À la racine du projet, lancez :
```bash
npm install
```

### Lancer le serveur de développement
Pour démarrer l'application en local :
```bash
ng serve
# ou via le script npm
npm start
```
Une fois le serveur lancé, ouvrez votre navigateur à l'adresse `http://localhost:4200/`. L'application se rechargera automatiquement à chaque modification des fichiers.

## 🏗 Structure du Code

L'architecture du projet dans `src/app` est organisée comme suit :

*   `components/` : Contient l'ensemble des vues et composants graphiques de l'application (Pages, Composants réutilisables).
*   `services/` : Contient la logique métier et les appels API vers le backend (ex: `OrderService`, `AuthService`).
*   `guards/` : Contient les règles de sécurité pour l'accès aux routes (ex: `AuthGuard`).
*   `interceptor/` : Gère l'interception des requêtes HTTP (ex: ajout du header Authorization).
*   `pipes/` : Transformateurs de données pour l'affichage (ex: formatage de dates ou devises).
*   `interfaces/` & `class/` : Modèles de données TypeScript forts pour garantir la cohérence des types.

## 📚 Documentation Technique

Ce projet est configuré avec **Compodoc** pour générer une documentation statique du code.

**Générer la documentation :**
```bash
npx compodoc -p tsconfig.app.json
```

**Générer et servir la documentation (sur le port 8080 par défaut) :**
```bash
npx compodoc -p tsconfig.app.json -s
```

## 🧪 Tests

Pour exécuter les tests unitaires via son framework de test (Karma/Jasmine) :
```bash
ng test
```

## 🔨 Build de Production

Pour compiler le projet pour la mise en production (fichiers optimisés dans le dossier `dist/`) :
```bash
ng build
```
