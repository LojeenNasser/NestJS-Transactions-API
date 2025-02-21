<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">A backend API built with <a href="http://nodejs.org" target="_blank">Node.js</a> and <a href="https://nestjs.com" target="_blank">NestJS</a> for managing users, accounts, and transactions using MongoDB.</p>

## 🚀 Features
- **User Management**: Create and fetch users.
- **Account Management**: Create and fetch accounts.
- **Transactions**: Deposit and transfer funds between accounts.
- **Swagger API Documentation**.
- **Validation & Error Handling**.

## 🛠️ Installation & Setup

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-username/NestJS-Transactions-API.git
cd NestJS-Transactions-API
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Setup Environment Variables**
Create a `.env` file in the root directory and add the following:
```env
MONGO_URI=mongodb://localhost:27017/owais_capital
PORT=3000
```

### **4️⃣ Start the Application**
```sh
npm run start
```
OR **with hot-reloading**:
```sh
npm run start:dev
```

## 📜 API Documentation
Once the server is running, visit:
```sh
http://localhost:3000/api
```

## 📌 API Endpoints
### **User Routes**
| Method | Endpoint | Description |
|--------|-----------|-------------|
| `POST` | `/users` | Create a new user |
| `GET` | `/users` | Get all users |

### **Account Routes**
| Method | Endpoint | Description |
|--------|-----------|-------------|
| `POST` | `/api/v1/accounts` | Create a new account |
| `GET` | `/api/v1/accounts` | Get all accounts |
| `GET` | `/api/v1/accounts/:id` | Get account by ID |

### **Transaction Routes**
| Method | Endpoint | Description |
|--------|-----------|-------------|
| `POST` | `/api/v1/transactions/deposit` | Deposit money into an account |
| `POST` | `/api/v1/transactions/transfer` | Transfer money between accounts |

## 🛠️ Technologies Used
- **NestJS** - Backend Framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Swagger** - API Documentation
- **Class-Validator** - Input Validation
- **Docker** (Optional)

## 🐳 Running with Docker
If you want to run the project in **Docker**, use the following command:
```sh
docker-compose up --build
```

## ✅ Testing the API
Use **Postman** or **cURL** to test the endpoints.

Example **POST** request to create a user:
```sh
POST http://localhost:3000/api/v1/users
Content-Type: application/json
{
  "name": "Lojeen Nasser",
  "email": "Lojeen Nasser@example.com"
}
```

Expected Response:
```json
{
  "_id": "60a7a4c4a6f3b831d0e8b0a1",
  "name": "Lojeen Nasser",
  "email": "Lojeen Nasser@example.com"
}
```

## 📌 Contributing
1. Fork the repo.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit changes (`git commit -m 'Added new feature'`).
4. Push to branch (`git push origin feature-name`).
5. Open a **Pull Request**.

## 📜 License
This project is **open-source** and available under the **MIT License**.

## 📞 Contact
For any questions or issues, feel free to reach out:
- **GitHub**: [Lojeen Nasser](https://github.com/LojeenNasser)
- **Email**: logeennasser123@gmail.com

