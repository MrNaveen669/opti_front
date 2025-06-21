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

![image](https://github.com/user-attachments/assets/031e95b8-0655-4bbe-ac18-22046fbf9eaa) , ![image](https://github.com/user-attachments/assets/682e6786-6043-4282-ba73-8ec8a821231d) ,![image](https://github.com/user-attachments/assets/c38e2059-5643-4ead-98b3-9317343f7f49), ![image](https://github.com/user-attachments/assets/9bc1bb5e-cd21-459b-bfd3-736d3bb83c99) ,  ![image](https://github.com/user-attachments/assets/00662dbc-6564-4cd5-bdb9-1416293d520c) ,![image](https://github.com/user-attachments/assets/c4e0c552-f89b-4b43-b40c-e69c101254c3)







---

## 🚀 Live Demo![image](https://github.com/user-attachments/assets/5f34c68b-2a67-494d-8467-50130777a9ae)


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

| 📱 Homepage | 
|------------|
| ![Home](https://github.com/user-attachments/assets/01129143-f267-4f59-a3f7-e1e398279599)
  🧾 Product Page | ![Product](https://github.com/user-attachments/assets/70084466-26fe-4e37-ace4-d54500764187)
 | 🛍️ Cart + Checkout| ![Cart](https://github.com/user-attachments/assets/36debc97-43f9-49a0-a90f-48e3196dcfcb)

 🔐 Auth Modal || ![Auth](https://github.com/user-attachments/assets/f06cbd42-84cd-4fd6-b550-cf0d6bc7df12)
 |

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

