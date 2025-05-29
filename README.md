# CFC25 Hackathon

This repository was created by The Scripts team for the Code for Change Hackathon 2025. We’re building a Book Purchase Platform using the MERN stack with Nkwa Payment API integration. The project aims to address limited access to educational resources by making it easier to browse and buy books online, while also helping us practice real-world dev.

## 🌐 Project Overview

This is a MERN (MongoDB, Express.js, React.js, Node.js) stack web application designed to [brief description — e.g., manage tasks, connect users, track expenses, etc.]. The app offers a seamless full-stack experience, with a RESTful API on the backend and a modern frontend interface.

---

```
CFC-Hackathon/
├                # React frontend application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   └── Navbar.tsx
│   │   ├── contexts/         # React contexts for state management
│   │   │   └── CartContext.tsx
│   │   ├── pages/            # Application pages
│   │   │   ├── Home.tsx
│   │   │   ├── BookDetails.tsx
│   │   │   ├── Cart.tsx
│   │   │   ├── Checkout.tsx
│   │   │   └── NotFound.tsx
│   │   ├── lib/              # Utilities and API functions
│   │   │   ├── api.ts
│   │   │   └── utils.ts
│   │   └── App.tsx
│   ├── package.json
│   └── README.md
└── backend/                  # Node.js/Express backend (to be created)
    ├── models/
    │   └── Book.js
    ├── routes/
    │   ├── books.js
    │   └── payments.js
    ├── middleware/
    ├── config/
    │   └── database.js
    ├── .env
    ├── server.js
    └── package.json
```

## ⚙️ Tech Stack

- **Frontend**: React.js (with Axios, React Router, etc.)
- **Backend**: Node.js with Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Others**: Dotenv, Nodemon, concurrently, etc.

---

## ✅ Requirements

Before setting up the project, ensure the following tools are installed:

### 🔧 System Requirements

- **Node.js** (v14 or higher): [Download Node.js](https://nodejs.org/)
- **MongoDB** (local or Atlas): [Install MongoDB](https://www.mongodb.com/try/download/community)
- **Git**: [Install Git](https://git-scm.com/downloads)
- **npm** or **yarn** (comes with Node)

---

## 🚀 Installation Instructions

### Frontend Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create environment file**

   ```bash
   # Create .env file in frontend directory
   VITE_API_URL=http://localhost:5000
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:8080`

### Backend Setup (To be implemented)

1. **Navigate to backend directory**

   ```bash
   cd ../backend
   ```

2. **Initialize Node.js project**

   ```bash
   npm init -y
   ```

3. **Install dependencies**

   ```bash
   npm install express mongoose cors dotenv axios
   npm install -D nodemon
   ```

4. **Create environment file**

   ```bash
   # Create .env file in backend directory
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/bookstore
   NKWA_API_KEY=7Wvq6JTL_i68jsgyMU474
   NKWA_API_URL=https://api.nkwa.com/payments/initiate
   ```

5. **Create server.js**

   ```javascript
   const express = require("express");
   const mongoose = require("mongoose");
   const cors = require("cors");
   require("dotenv").config();

   const app = express();

   // Middleware
   app.use(cors());
   app.use(express.json());

   // Routes
   app.use("/api/books", require("./routes/books"));
   app.use("/api/payment", require("./routes/payments"));

   // Database connection
   mongoose.connect(process.env.MONGODB_URI, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
   });

   const PORT = process.env.PORT || 5000;
   app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
   });
   ```

6. **Start the backend server**
   ```bash
   npm run dev
   ```

## 🔧 Configuration

### Nkwa Payment API Setup

1. **API Key Configuration**

   - Add your Nkwa API key to the backend `.env` file
   - The API key `7Wvq6JTL_i68jsgyMU474` should be stored as `NKWA_API_KEY`

2. **Payment Integration**

   - The payment endpoint is configured to use `https://api.nkwa.com/payments/initiate`
   - Authorization header format: `Bearer 7Wvq6JTL_i68jsgyMU474`
   - The API expects: amount, email, callback_url

3. **Callback URL**
   - Set up a callback URL for payment confirmations
   - Example: `https://yourdomain.com/payment-success`

## 📚 API Endpoints

### Books

- `GET /api/books` - Fetch all books
- `GET /api/books/:id` - Fetch a specific book
- `POST /api/books` - Add a new book (admin)

### Payments

- `POST /api/payment/create` - Initialize payment with Nkwa

## 🎨 Frontend Technologies

- **React 18** - Modern React with hooks
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **React Query** - Data fetching and caching
- **Shadcn/ui** - Beautiful UI components
- **Lucide React** - Modern icon library
- **Sonner** - Toast notifications

## 🔒 Backend Technologies (To be implemented)

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **dotenv** - Environment variable management
- **cors** - Cross-origin resource sharing
- **axios** - HTTP client for API requests

## 🌐 Deployment

### Frontend Deployment

- Build the project: `npm run build`
- Deploy to platforms like Vercel, Netlify, or GitHub Pages

### Backend Deployment

- Deploy to platforms like Heroku, Railway, or DigitalOcean
- Ensure environment variables are properly configured
- Set up MongoDB Atlas for cloud database

## 🔐 Environment Variables

### Frontend (.env)

```
VITE_API_URL=http://localhost:5000
```

### Backend (.env)

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookstore
NKWA_API_KEY=7Wvq6JTL_i68jsgyMU474
NKWA_API_URL=https://api.nkwa.com/payments/initiate
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, email rtech777r@gmail.com or create an issue in the repository.

---
