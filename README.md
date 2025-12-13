# Project Name: Car rental system

**Live URL:** https://car-rental-system-lovat.vercel.app/  
**GitHub Repository:** https://github.com/ijazhossain/L2-Assignment2

---

## 📌 Overview

This project is a backend REST API built with **Node.js**, **TypeScript**, and **Express**. It provides secure authentication and data handling using **PostgreSQL**, following modern backend development best practices.

---

## 🚀 Features

- JWT-based user authentication
- Secure password hashing using bcrypt
- RESTful API structure with Express
- PostgreSQL database integration
- Environment variable management with dotenv
- Written in TypeScript for better type safety
- Hot-reload development setup using tsx
- Deployment-ready configuration for Vercel

---

## 🛠️ Technology Stack

- **Runtime:** Node.js  
- **Language:** TypeScript  
- **Framework:** Express.js  
- **Database:** PostgreSQL  
- **Authentication:** JWT, bcrypt  
- **Environment Management:** dotenv  
- **Dev Tools:** tsx, TypeScript  
- **Deployment:** Vercel  

---


 ## ⚙️ Setup & Installation

### 1️⃣ Clone the Repository
```
bash

git clone https://github.com/ijazhossain/L2-Assignment2.git
cd your-repository-name
```
### 2️⃣ Install Dependencies
```
bash

npm install
```
### 3️⃣ Environment Variables

Create a `.env` file in the root directory and add the following variables:

```
env

PORT=5000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret
```
### ▶️ Running the Application
#### Development Mode
```
bash

npm run dev
```
#### Build the Project
```
bash

npm run build
```
## 📡 API Usage

- **Base URL:** `http://localhost:5000`
- **Authentication:** Bearer Token (JWT)

You can test the APIs using **Postman**, **Thunder Client**, or **Insomnia**.

## 📡 API Endpoints

### 🔐 Authentication

| Method | Endpoint | Access | Description |
|--------|---------|--------|-------------|
| POST   | `/api/v1/auth/signup` | Public | Register a new user account |
| POST   | `/api/v1/auth/signin` | Public | Login and receive JWT token |

---

### 🚗 Vehicles

| Method | Endpoint | Access | Description |
|--------|---------|--------|-------------|
| POST   | `/api/v1/vehicles` | Admin only | Add new vehicle with name, type, registration number, daily rent price, and availability |
| GET    | `/api/v1/vehicles` | Public | View all vehicles |
| GET    | `/api/v1/vehicles/:vehicleId` | Public | View specific vehicle details |
| PUT    | `/api/v1/vehicles/:vehicleId` | Admin only | Update vehicle details, rent price, or availability |
| DELETE | `/api/v1/vehicles/:vehicleId` | Admin only | Delete vehicle (only if no active bookings exist) |

---

### 👤 Users

| Method | Endpoint | Access | Description |
|--------|---------|--------|-------------|
| GET    | `/api/v1/users` | Admin only | View all users |
| PUT    | `/api/v1/users/:userId` | Admin / Own | Admin can update any user. Customer can update own profile only |
| DELETE | `/api/v1/users/:userId` | Admin only | Delete user (only if no active bookings exist) |

---

### 📅 Bookings

| Method | Endpoint | Access | Description |
|--------|---------|--------|-------------|
| POST   | `/api/v1/bookings` | Customer / Admin | Create booking with start & end dates. Validates availability, calculates total price, and marks vehicle as booked |
| GET    | `/api/v1/bookings` | Role-based | Admin show all bookings, Contomer as their own

### 🔑 Authorization Notes

- Authentication uses **JWT (Bearer Token)**  
- Include token in request headers:

```
http
Authorization: Bearer <your_jwt_token>
```
## 🔗 What You Need to Provide

- **GitHub Repository Link:** https://github.com/ijazhossain/L2-Assignment2  
- **Live Deployment Link:** https://car-rental-system-lovat.vercel.app/  

---

## 👤 Author

**IJAZ HOSSAIN**  
Backend Developer
