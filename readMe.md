

````markdown
# 💳 Backend Task API

This is a simple RESTful API built with **Express**, **TypeScript**, and **Prisma** that manages **Users (including Vendors)** and **Payments**. It includes features such as user creation, JWT authentication, payment tracking, and role-based access control.

---

## 📁 Project Structure

```bash
├── prisma/                   # Prisma schema and migrations
├── src/
│   ├── controller/           # Express route controllers
│   ├── service/              # Business logic layer (UserService, PaymentService)
│   ├── routes/               # API route definitions
│   ├── schema/               # Joi validation schemas
│   ├── middleware/           # Authentication and validation middleware
│   ├── utils/                # Utility functions (e.g. JWT, account number generator)
│   ├── interface/            # TypeScript interfaces
│   ├── generated/prisma/     # Prisma client output
│   └── index.ts              # Entry point
````

---

## 🚀 Features

* 👤 **User & Vendor Management**
* 🔐 **JWT Authentication**
* 💰 **Payment Creation & Approval**
* 📄 **Swagger API Documentation**
* 📥 **Validation with Joi**

---

## 🛠️ Tech Stack

* **Node.js**
* **Express**
* **TypeScript**
* **Prisma ORM**
* **PostgreSQL**
* **Joi**
* **Swagger**

---

## 🔐 Environment Setup

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://yourUser:yourPassword@localhost:5432/backend_task"
PORT=5000
JWT_SECRET=your_jwt_secret
```

---

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/Couragenwanduka/test.git

# Navigate to project folder
cd test

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init
```

---

## ▶️ Running the Server

```bash
npm run dev
```

---

## 📄 API Documentation

Swagger docs available at:
[http://localhost:5000/api-docs](http://localhost:5000/api-docs)

---

## 🔑 Sample User Payload

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "strongpassword123",
  "phoneNumber": "08123456789",
  "address": "123 Main St",
  "role": "USER"
}
```

---

## 🏦 Sample Payment Payload

```json
{
  "vendorId": "vendor-user-id",
  "amount": 10000
}
```

---

## 🧪 Testing with Postman

Use the `/vendors` route for creating users and `/payment` for creating and managing payments.

---

## 🧼 Notes

* All sensitive values are stored in `.env`
* Passwords should be hashed before storage (ensure bcrypt is set up properly)
* Account numbers are auto-generated and start with `89`

---

## 📧 Contact

Built by **Courage Nduka**
Feel free to connect on [LinkedIn](https://www.linkedin.com/in/couragenduka?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app) or reach out via email.

```

---

Let me know if you want to add a **license section**, **contribution guide**, or **Docker setup**!
```
