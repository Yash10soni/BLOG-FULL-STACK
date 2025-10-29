# 📰 BLOG FULL STACK (MERN + PostgreSQL)

A complete **full-stack blog website** where users can create, read, update, and delete blog posts — featuring authentication, JWT-based login, and PostgreSQL as the backend database.  
Built using **React (Frontend)** and **Node.js + Express (Backend)** with a clean and modular architecture.

---

## 🚀 Features

✅ User Registration & Login (JWT Authentication)  
✅ Create, Edit, Delete, and View Blog Posts  
✅ Secure API Endpoints with Middleware Protection  
✅ Responsive Frontend built with React  
✅ PostgreSQL Database Integration (instead of MongoDB)  
✅ Environment Variables stored safely in `.env`  
✅ Clean Folder Structure for Scalability  

---

## 🧩 Tech Stack

| Layer | Technology |
|:------|:------------|
| **Frontend** | React.js, Axios, React Router |
| **Backend** | Node.js, Express.js |
| **Database** | PostgreSQL |
| **Authentication** | JSON Web Token (JWT) |
| **Styling** | CSS / TailwindCSS (as per your setup) |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Yash10soni/BLOG-FULL-STACK.git
cd "BLOG WEBSITE"
2️⃣ Install Dependencies
Backend Setup:
bash
Copy code
cd blog-backend
npm install
Frontend Setup:
bash
Copy code
cd ../blog-frontend
npm install
3️⃣ Configure Environment Variables
Create a .env file inside the blog-backend folder with the following content:

env
Copy code
# PostgreSQL Database Configuration
DB_USER=postgres
DB_HOST=localhost
DB_NAME=blogdb
DB_PASSWORD=yourpassword
DB_PORT=5432

# JWT Secret Key
JWT_SECRET=my_super_secret_jwt_key
4️⃣ Run the Project
Start the Backend:
bash
Copy code
cd blog-backend
npm run dev
Start the Frontend:
bash
Copy code
cd ../blog-frontend
npm start
Your app will be live at 👉 http://localhost:3000

🗂 Folder Structure
pgsql
Copy code
BLOG WEBSITE/
│
├── blog-backend/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── db.js
│   ├── server.js
│   ├── package.json
│   └── .env (ignored from GitHub)
│
├── blog-frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── index.js
│   ├── public/
│   └── package.json
│
└── README.md
💡 Future Enhancements
✨ Add Image Upload Feature for Blogs
✨ Add Comment & Like System
✨ Improve UI with Animations
✨ Add Category Filtering
✨ Deploy Frontend & Backend Online (Vercel / Render / Railway)

👨‍💻 Author
Yash Soni
📧 sourabhsoni436@gmail.com
🌐 GitHub Profile
💬 Passionate Full Stack Developer | React | Node.js | PostgreSQL

🧾 License
This project is licensed under the MIT License — feel free to use and modify it with credit.

📄 Project Description (for GitHub)
🚀 A Full Stack Blog Website built using React, Node.js, Express, and PostgreSQL featuring JWT authentication, CRUD operations, and a clean, scalable structure.

yaml
Copy code

---

### ✅ Final Steps to Show It on GitHub:
Run these commands:
```bash
git add README.md
git commit -m "Added detailed README for BLOG FULL STACK project"
git push origin master
