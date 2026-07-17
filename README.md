# 💬 Chatify

Chatify is a real-time chat application built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). It enables users to communicate in real-time through a modern, responsive, and user-friendly interface.

---

## 🚀 Features

- 🔐 User Authentication (Signup/Login)
- 💬 Real-time messaging
- 👤 User profiles
- 🟢 Online/Offline user status
- 📱 Responsive UI
- 🌙 Modern and clean design
- 🔒 Secure password hashing
- ⚡ Fast and scalable architecture

---
## 🚀 Live Demo

🌐 **Try Chatify:** https://chatify-chat-application-client.onrender.com

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- Redux-Toolkit

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

### Real-Time Communication
- Socket.IO

---

## 📂 Project Structure

```
Chatify/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── socket/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── customhooks/
│   │   ├── redux/
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

## 📸 Screenshots

> Add screenshots of your application here.
## 📸 Screenshots

### Login
![Login](./Screenshot%20(156).png)

### Signup
![Theme](./Screenshot%20(157).png)

### Chat
![SignUp](./Screenshot%20(158).png)

### Theme
![Chat](./Screenshot%20(159).png)

### Profile
![Profile](./Screenshot%20(160).png)

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/chatify.git
cd chatify
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the backend folder and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
API_KEY=your_API_KEY
API_SECRET=your_API_SECRET
```

---

## ▶️ Run the Application

### Start Backend

```bash
cd backend
npm run dev
```

### Start Frontend

```bash
cd frontend
npm run dev
```

Open:

```
http://localhost:5173
```

---

## 📦 Build for Production

Frontend:

```bash
npm run build
```

Backend:

```bash
npm start
```

---

## 📖 API Overview

### Authentication

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `POST /api/auth/deleteUser` 

### Messages

- `GET /api/messages/:id`
- `POST /api/messages/send/:id`

### Users

- `GET /api/users`

---

## 🔒 Authentication

Chatify uses:

- JSON Web Tokens (JWT)
- Password hashing with bcryptjs
- Protected routes
- Cookie-based authentication

---

## 🚀 Future Improvements

- Group chats
- Voice & video calling
- Message reactions
- File sharing
- Read receipts
- Push notifications
- Dark mode

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new feature branch

```bash
git checkout -b feature/your-feature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to your branch

```bash
git push origin feature/your-feature
```

5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Mohit Yadav

- GitHub: https://github.com/mohityadav17
- LinkedIn: https://www.linkedin.com/in/mohit-yadav-234941251/

---

⭐ If you found this project useful, consider giving it a star!
