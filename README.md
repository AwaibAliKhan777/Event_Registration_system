# Event Registration System

A backend API for managing events and user registrations built using **Node.js, Express.js, and MongoDB**.
This system allows users to view events, register for events, and manage their registrations. Admin users can create and manage events.

---

## 🚀 Features

* User authentication using **JWT**
* User registration and login
* Admin can create, update, and delete events
* View list of all events
* View single event details
* Register for an event
* Prevent duplicate registrations
* View user registrations
* Cancel event registration
* Protected routes using middleware

---

## 🛠 Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **JWT Authentication**
* **bcryptjs**
* **dotenv**

---

## 📂 Project Structure

```
event-registration-system
│
├── config
│   └── db.js
│
├── middleware
│   └── authMiddleware.js
│
├── models
│   ├── User.js
│   ├── Event.js
│   └── Registration.js
│
├── routes
│   ├── authRoutes.js
│   ├── eventRoutes.js
│   └── registrationRoutes.js
│
├── server.js
├── package.json
├── .env
└── README.md
```

---

## ⚙️ Installation

Clone the repository

```
git clone https://github.com/YOUR_GITHUB_USERNAME/event-registration-system.git
```

Go to the project directory

```
cd event-registration-system
```

Install dependencies

```
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory.

Example:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## ▶️ Running the Server

Start the development server:

```
npm run dev
```

Server will run at:

```
http://localhost:5000
```

---

## 📡 API Endpoints

### Authentication

**Register User**

```
POST /api/auth/register
```

**Login User**

```
POST /api/auth/login
```

---

### Events

**Create Event (Admin only)**

```
POST /api/events
```

**Get All Events**

```
GET /api/events
```

**Get Event Details**

```
GET /api/events/:id
```

**Update Event**

```
PUT /api/events/:id
```

**Delete Event**

```
DELETE /api/events/:id
```

---

### Registrations

**Register for Event**

```
POST /api/registrations/:eventId
```

**View My Registrations**

```
GET /api/registrations/my
```

**Cancel Registration**

```
DELETE /api/registrations/:id
```

---

## 🔐 Authentication

Protected routes r
