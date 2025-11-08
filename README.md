# 🚀 User Management App — React + Express + PostgreSQL

Une application complète de gestion des utilisateurs, construite avec un **frontend moderne React + Material UI (MUI)** et un **backend Express.js** connecté à **PostgreSQL**.  
Permet d’ajouter, afficher, modifier et supprimer des utilisateurs avec gestion des photos de profil.

---

## 🖥️ Aperçu

### 🎨 Frontend
- Développé avec **React + TypeScript + Vite**
- Design responsive avec **Material UI**
- Notifications colorées (succès, erreur)
- Pop-up de modification fluide et esthétique
- Masonry layout pour une grille propre et dynamique

### ⚙️ Backend
- API REST construite avec **Express.js**
- Connexion à **PostgreSQL**
- Upload d’images avec **multer**
- Routes CRUD :
  - `GET /users` → Récupère tous les utilisateurs  
  - `POST /users` → Ajoute un utilisateur  
  - `PUT /users/:id` → Met à jour un utilisateur  
  - `DELETE /users/:id` → Supprime un utilisateur  

---

## 🧱 Structure du projet

📦 user-management-app
├── backend
│ ├── server.js
│ ├── db.js
│ ├── routes/
│ │ └── users.js
│ └── uploads/
│ └── (photos des utilisateurs)
│
├── frontend
│ ├── src/
│ │ ├── components/
│ │ │ ├── UsersList.tsx
│ │ │ ├── EditUserForm.tsx
│ │ │ └── ProfileForm.tsx
│ │ ├── pages/
│ │ │ └── UsersPage.tsx
│ │ ├── api/axiosConfig.ts
│ │ ├── types.ts
│ │ └── main.tsx
│ ├── package.json
│ └── vite.config.ts
│
└── README.md


---

## ⚡ Installation

### 1️⃣ Cloner le projet

```bash
  git clone https://github.com/ton-pseudo/user-management-app.git
  cd user-management-app
```
### 2️⃣ Configurer le backend

  ```bash
    cd backend
    npm install
  ```
  # Créer un fichier .env :

  ```bash
  PORT=5000
  DB_HOST=localhost
  DB_USER=postgres
  DB_PASSWORD=tonmotdepasse
  DB_NAME=userdb
  DB_PORT=5432
  ```

  # Lancer le serveur :

  ```bash
    npm start
  ```
### 3️⃣ Configurer le frontend

```bash
cd ../frontend
npm install
npm run dev
```
Le frontend démarre sur http://localhost:5173

### 🧠 Table PostgreSQL
  ```sql
  CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  bio TEXT,
  countrycode VARCHAR(5),
  photo VARCHAR(255)
);
```

📸 Fonctionnalités

✅ Ajouter un utilisateur
✅ Modifier via une fenêtre pop-up élégante
✅ Supprimer un utilisateur avec confirmation
✅ Notifications automatiques (succès / erreur)
✅ Upload et affichage de la photo de profil
✅ Interface fluide et responsive

# 🌈 Aperçu visuel

| Liste d’utilisateurs | Formulaire d’ajout | Pop-up de modification |
|----------------------|--------------------|-------------------------|
| ![Liste d’utilisateurs](./preview/users-list.png) | ![Formulaire d’ajout](./preview/add-form.png) | ![Pop-up de modification](./preview/edit-popup.png) |

---

## 🛠️ Tech Stack

| Technologie | Rôle |
|--------------|------|
| ⚛️ **React + TypeScript** | Frontend |
| 🎨 **Material UI** | UI / Design |
| 🧩 **Express.js** | API backend |
| 🐘 **PostgreSQL** | Base de données |
| 📦 **Axios** | Requêtes HTTP |
| 🖼️ **Multer** | Upload d’images |

---

## 💡 Améliorations futures

- 🔒 **Authentification JWT**
- 🔍 **Recherche et filtrage des utilisateurs**
- 📄 **Pagination**
- 👑 **Gestion des rôles (admin, utilisateur)**
- 🌙 **Dark mode**

---

## 👨‍💻 Auteur

**Bryan Lakara**  
💌 [lakarabryan@gmail.com](mailto:lakarabryan@gmail.com)

---

### 🪄 Bonus

> Ce projet a été conçu dans un style **pixel art minimaliste**, avec un design responsive et une interface fluide entre les formulaires et les cartes utilisateurs.
