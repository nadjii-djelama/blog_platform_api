# 🚀 Blog Platform API

A robust **TypeScript + Express REST API** for a modern blog platform. Features user roles, posts, comments, JWT auth, sessions, and **Arcjet** protection against bots and rate limits.

## ✨ Key Features

- **👥 Users**: Signup, login, edit, list, delete • Role-based access (`admin`, `author`, `reader`)
- **📝 Posts**: CRUD operations (create, read, update, delete) • List & fetch by ID
- **💬 Comments**: Add, edit, delete • Nested under posts • Author-restricted
- **🔐 Auth**: JWT middleware protects routes
- **🛡️ Authorization**: Role-based middleware
- **📱 Sessions**: `express-session` support
- **⚡ Arcjet**: Bot detection & rate limiting (`@arcjet/node`)

## 🛠 Tech Stack

| Tech | Purpose |
|------|---------|
| **Node.js + TypeScript** | Core runtime & type safety |
| **Express 5** | Web framework |
| **MongoDB + Mongoose** | Database & schemas |
| **JWT** | Token authentication |
| **Arcjet** | Security protection |

## 📁 Repository Structure

src/
├── server.ts # App entry & routes
├── config/ # Env, DB, Arcjet setup
├── controllers/ # User, post, comment logic
├── models/ # User, Post, Comment schemas
├── middlewares/ # Auth, roles, Arcjet, sessions
└── routes/ # API route definitions

text

## 🔧 Environment Variables

Create `.env` in root:

```env
MONGODB_URI="mongodb://localhost:27017/blog_platform_api"
PORT=3000
JWT_SECRET="your_jwt_secret"
SESSION_SECRET="your_session_secret"
ARCJET_KEY="your_arcjet_key"
ARCJET_ENV="development"

# Role keys (optional)
ADMIN_KEY="admin_key_12345"
AUTHOR_KEY="author_key_12345"
READER_KEY="reader_key_12345"
Notes:

Get ARCJET_KEY from Arcjet dashboard

JWT_SECRET signs auth tokens

🚀 Quick Start
Install:

bash
npm install
Dev mode (with nodemon):

bash
npm run dev
Production:

bash
npm run build
npm start
Port: 3000 (configurable via PORT)

📋 API Endpoints
Base: /api/v1

👤 User Routes
Method	Endpoint	Description	Access
POST	/signup	Create user	Public
POST	/login	Get JWT	Public
PUT	/edit-user/:id	Update user	Admin
GET	/get-users	List users	Admin
GET	/get-user/:id	Get user	Admin
DELETE	/delete-user/:id	Delete user	Admin
📤 Post Routes
Method	Endpoint	Description	Access
POST	/create-post	Create post	Admin, Author
PUT	/edit-post/:id	Update post	Admin, Author
DELETE	/delete-post/:id	Delete post	Admin, Author
GET	/posts	List posts	Authenticated
GET	/post/:id	Get post	Authenticated
💬 Comment Routes (nested)
Method	Endpoint	Description	Access
POST	/post/:post_id/add-comment	Add comment	Authenticated
PUT	/post/:post_id/edit-comment/:id	Update comment	Admin, Reader
DELETE	/post/:post_id/remove-comment/:id	Delete comment	Admin, Reader
Headers: Authorization: Bearer <jwt_token>

⚙️ Implementation Highlights
Models: User, Post, Comment in src/models

Middleware:

authorization.middleware.ts → JWT verification

role-authorization.middleware.ts → Role checks

arcjet.middleware.ts → Bot/rate protection (fail-open)

session.middleware.ts → Session config

DB: Auto-connects on startup (db_connection())

🧪 Development Tips
✅ Start MongoDB locally or use MONGODB_URI

🧑‍💻 Test with Postman / curl + JWT header

👑 First admin: Signup prevents duplicate admins

🔍 Check src/controllers for role logic

🚀 Next Steps
✅ Add unit/integration tests

✅ Validation (express-validator)

✅ Swagger/OpenAPI docs

✅ Enhanced login protections

✅ Linting & formatting rules

📄 License
No license included. Add LICENSE file for public repos (MIT recommended).
