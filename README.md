# 📜 Application de Covoiturage 🚗

## 📌 Description du Projet

Cette application de covoiturage permet aux utilisateurs de :  
✅ Trouver un trajet 🚙  
✅ Proposer un trajet 🛣️  
✅ Se connecter / s'inscrire 🔐  
✅ Voir leur profil 👤

Développée avec **React Native (Expo 52) + Node.js (Express) + MySQL**.

---

## 🚀 Installation & Configuration

### 1️⃣ Cloner le projet

```sh
git clone https://github.com/badie16/Ride4Earth.git
cd Ride4Earth
```

### 2️⃣ Installer les dépendances

**📌 Backend (Node.js + Express)**

```sh
cd backend
npm install
```

**📌 Frontend (React Native avec Expo 52)**

```sh
cd ../Ride4Earth
npm install
```

### 3️⃣ Configurer les variables d’environnement

Crée un fichier **`.env`** dans `backend/` avec :

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=mot_de_passe
DB_NAME=covoiturage
JWT_SECRET=ton_secret
```

Dans **`Ride4Earth/.env`** ajoute l’URL de l’API :

```env
API_URL=http://localhost:5000/api
```

---

## 🎯 Lancer l'application

### 📌 Démarrer le Backend

```sh
cd backend
npm start
```

### 📌 Démarrer le Frontend (Expo 52)

```sh
cd ../Ride4Earth
npm start
```

🔹 **Scan le QR Code avec Expo Go** pour tester l’application sur ton téléphone 📱.

---

## 📂 Structure du Projet

```bash
Ride4Earth/
│── App/                     # Expo Router
│   ├── _layout.tsx          # Layout principal
│   ├── index.tsx            # Accueil
│   ├── login.tsx            # Page de connexion
│   ├── register.tsx         # Page d'inscription
│   ├── home.tsx             # Page principale
│   ├── search.tsx           # Recherche de trajets
│   ├── offer.tsx            # Proposer un trajet
│── src/
│   ├── components/          # Composants réutilisables
│   ├── services/            # API avec Axios
│   ├── context/             # Gestion globale de l’état
│── backend/                 # API Node.js + Express
│   ├── models/              # Modèles MySQL
│   ├── routes/              # Routes API
│   ├── server.js            # Serveur Express
│── .env                     # Variables d’environnement
│── package.json             # Dépendances
```

---

## 📢 Contribution

1️⃣ **Créer une branche** :

```sh
git checkout -b feature-nom-de-la-fonctionnalité
```

2️⃣ **Faire des modifications et committer** :

```sh
git add .
git commit -m "Ajout de la fonctionnalité X"
```

3️⃣ **Pousser et créer une pull request** :

```sh
git push origin feature-nom-de-la-fonctionnalité
```

---

## 📌 Technologies utilisées

- **Frontend** : React Native (Expo 52), Expo Router, Redux
- **Backend** : Node.js, Express.js, MySQL
- **API** : Axios
- **Authentification** : JWT
- **Géolocalisation** : React Native Maps
- **Notifications** : Expo Notifications

---

## 📞 Contact & Support

Si vous avez un problème, ouvrez une **issue** sur GitHub ou contactez-moi ! 😃

---

🎉 **Bon développement !** 🚀
