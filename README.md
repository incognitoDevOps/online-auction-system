# 🛒 Online Auction System – MERN Stack Web App

An online auction platform built with the **MERN stack**, offering secure login, cookie-based authentication, and user login tracking.

## 🌐 Live Preview

🔗 [Visit Website](https://online-auction-system-frontend-jet.vercel.app/)

---

## 📦 Tech Stack

### 🖥️ Frontend

* React 19 (Vite + JSX)
* Tailwind CSS
* React Router v7+
* Axios
* TanStack Query (React Query)
* Redux Toolkit

### 🛠 Backend

* Node.js + Express.js
* MongoDB + Mongoose
* Multer (for image upload)
* JWT Auth via `httpOnly` cookies
* Cloudinary (for image hosting)
* IP, browser, and geo-location tracking

---

## 📁 Project Structure

```
online-auction-system/
├── client/        # React frontend
└── server/        # Express backend
```

---

## ⚙️ Environment Variables

### 🔐 Backend `.env`

```env
PORT=3000
ORIGIN=http://localhost:5173
MONGO_URL=<your-mongodb-url>
JWT_SECRET=<your-jwt-secret>
JWT_EXPIRES_IN=1d
CLOUDINARY_CLOUD_NAME=<cloud-name>
CLOUDINARY_API_KEY=<cloud-key>
CLOUDINARY_API_SECRET=<cloud-secret>
CLOUDINARY_URL=<cloudinary-url>
RESEND_API_KEY=<resend-api-key>
```

### 🌐 Frontend `.env`

```env
VITE_API=http://localhost:3000
VITE_AUCTION_API=http://localhost:3000/auction
```

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone <your-repo-url>
cd online-auction-system
```

### 2️⃣ Setup Backend

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

### 3️⃣ Setup Frontend

```bash
cd ../client
npm install
cp .env.example .env
npm run dev
```

---

## 🔐 Authentication

Tokens are stored in **`httpOnly` cookies**, ensuring security by preventing JavaScript access. Auth state is synced via Redux and verified on refresh.

### `/auth` Routes

| Method | Endpoint       | Description              |
| ------ | -------------- | ------------------------ |
| POST   | `/auth/login`  | Login user (sets cookie) |
| POST   | `/auth/signup` | Register new user        |
| POST   | `/auth/logout` | Logout user              |

### `/user` Route

| Method | Endpoint | Description                        |
| ------ | -------- | ---------------------------------- |
| GET    | `/user`  | Auto-login if valid cookie present |

---

## 🛒 Auction API

| Method | Endpoint         | Description                            |
| ------ | ---------------- | -------------------------------------- |
| GET    | `/auction/stats` | Dashboard stats (active, total, user)  |
| GET    | `/auction/`      | Fetch all auctions                     |
| POST   | `/auction/`      | Create auction (image upload required) |
| GET    | `/auction/:id`   | Get a specific auction item            |
| POST   | `/auction/:id`   | Place a bid on an item                 |

---

## 🔍 Key Features

✅ Cookie-based Auth
✅ Auto-login with valid session
✅ Auction creation + image upload
✅ Tracks user bidding activity
✅ Login tracking (IP, device, geo)
✅ Multer + Cloudinary integration
✅ React Router v7 support

---

## 🔒 Login Security Logging

Tracks and logs the following:

* 🌐 IP Address
* 🌍 Country & State (GeoIP)
* 💻 Device Type
* 🌐 Browser Info

Helps detect suspicious activity and prevents abuse.

---

## 🧠 State Management

* **Redux Toolkit**: Global authentication state
* **TanStack Query**: Data fetching + caching
* Seamless sync between frontend and backend

---

## 🔧 Upcoming Features

* ✅ Comprehensive error handling
* ✅ Login throttling to prevent spam
* 🔄 **WebSocket support for real-time bidding**

---

## 👨‍💻 Contribution Guide

1. Fork the repo
2. Create your branch: `git checkout -b feature-branch`
3. Make changes and commit: `git commit -m "Add feature"`
4. Push and open a Pull Request (PR)

---