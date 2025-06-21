<h1 align="center">🛍️ Opticlair – Modern Optical E-Commerce Store</h1>

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=24&pause=1000&color=4D9EF7&center=true&vCenter=true&width=435&lines=Your+Vision+Our+Mission.;Shop+Smart.+See+Clear.;Fast%2C+Secure+%26+Stylish." alt="Typing SVG" />
</p>

<p align="center">
  <strong>🧿 Buy Eyewear with Confidence | 🧾 Verified Lenses | 📦 Easy Checkout</strong><br />
  Full-stack e-commerce platform built with MERN (MongoDB, Express, React, Node.js) + Razorpay + Admin Panel
</p>

---

## 🖼️ Preview

<img src="https://user-images.githubusercontent.com/your-demo-screenshot.gif" alt="Opticlair Preview" />

---

## 🚀 Live Demo

🔗 Frontend: [https://www.opticlair.in](https://opticlair.in)  
🔗 Admin Panel: [https://admin-opticlair.com](https://opticlair-admin.onrender.com)

---

## 🧩 Features

- 🛒 **Product Browsing & Filtering**  
- 👓 **Lens Customization with Frame Selector**  
- 📤 **Image Upload after Lens Selection**  
- 💳 **Secure Payments via Razorpay**  
- 🧾 **Product Authenticity Verification via QR Code**  
- 🔐 **Login / Signup with Auth Modal**  
- 📆 **Appointment Booking (Date & Time Picker)**  
- 🧑‍💼 **Admin Dashboard with Product & Order Management**

---

## ⚙️ Tech Stack

| Frontend | Backend | Database | Payments | Auth | Hosting |
|----------|---------|----------|----------|------|---------|
| React + Vite + Chakra UI | Node.js + Express | MongoDB Atlas | Razorpay | JWT Auth | Vercel + Render |

---

## 📦 Folder Structure
opticlair/
├── frontend/ # React Vite frontend
├── backend/ # Node + Express server
├── admin/ # Admin panel
├── public/ # Static assets
└── README.md # This file

---

## 📸 Screenshots

| 📱 Homepage | 🧾 Product Page | 🛍️ Cart + Checkout | 🔐 Auth Modal |
|------------|----------------|--------------------|---------------|
| ![Home](https://via.placeholder.com/200x120) | ![Product](https://via.placeholder.com/200x120) | ![Cart](https://via.placeholder.com/200x120) | ![Auth](https://via.placeholder.com/200x120) |

---

📈 Future Enhancements
📬 Order Email Notifications

📱 PWA Support

🧾 GST Invoice Download

📊 Advanced Sales Analytics in Admin Panel

🧑‍💻 Developer
Made with ❤️ by WebAksh
📬 Contact: webaksh@gmail.com

📄 License
This project is licensed under the MIT License.

---
## 🔐 Environment Variables

Create a `.env` file in `/backend` and `/frontend`:

```env
# Backend .env
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret
RAZORPAY_KEY_ID=your-key
RAZORPAY_KEY_SECRET=your-secret

# 1. Clone the repo
git clone https://github.com/MrNaveen669/opticlair.git
cd opticlair

# 2. Setup Frontend
cd frontend
npm install
npm run dev

# 3. Setup Backend
cd ../backend
npm install
node index.js

# 4. Setup Admin Panel (optional)
cd ../admin
npm install
npm run dev

