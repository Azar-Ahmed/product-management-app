# 🛒 Product Management Backend

This is a robust **Node.js + Express.js** backend API designed for an e-commerce product management system. It features **user authentication**, **profile management**, **secure password handling**, **image uploads**, and **complete product CRUD operations** with filtering.

---

## 🚀 Getting Started

### 📦 Install Dependencies

```bash
npm install
```

### ▶️ Start Development Server

```bash
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in your root directory with the following values:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

---

## 📁 Folder Structure

```
project-root/
├── controllers/         # Business logic (auth, user, product)
├── middlewares/         # Auth, validation, error handling
├── models/              # Mongoose schemas
├── routes/              # User and product route handlers
├── utils/               # Utilities (token handling, Cloudinary)
├── uploads/             # Temporary uploads (if any)
├── .env                 # Environment variables
├── app.js               # Express app config
├── server.js            # Server entry point
└── README.md
```

---

## 🧪 Tech Stack

- **Backend Framework**: Express.js (v5)
- **Database**: MongoDB + Mongoose
- **Auth**: JWT
- **Validation**: Joi
- **File Uploads**: express-fileupload + Cloudinary
- **Security**: bcryptjs, cookie-parser
- **CORS Support**: cors
- **Environment Config**: dotenv

---

## 📦 Installed Packages

```json
"bcryptjs": "^3.0.2",
"body-parser": "^2.2.0",
"cloudinary": "^2.6.1",
"cookie-parser": "^1.4.7",
"cors": "^2.8.5",
"dotenv": "^16.5.0",
"express": "^5.1.0",
"express-fileupload": "^1.5.1",
"joi": "^17.13.3",
"jsonwebtoken": "^9.0.2",
"mongoose": "^8.15.0"
```

---

## 👤 User Routes

| Method | Route              | Access         | Description             |
|--------|--------------------|----------------|-------------------------|
| POST   | `/signup`          | Public         | Register new user       |
| POST   | `/signin`          | Public         | Login user              |
| GET    | `/signout`         | Authenticated  | Logout user             |
| PUT    | `/update`          | Authenticated  | Update user profile     |
| PUT    | `/change-password` | Authenticated  | Change user password    |

---

## 🛍️ Product Routes

| Method | Route             | Access     | Description               |
|--------|-------------------|------------|---------------------------|
| POST   | `/add`            | Admin      | Add a new product         |
| PUT    | `/update/:id`     | Admin      | Update product by ID      |
| DELETE | `/delete/:id`     | Admin      | Delete product by ID      |
| GET    | `/`               | Public     | Get all products          |
| GET    | `/filter`         | Public     | Get filtered products     |
| GET    | `/:id`            | Public     | Get product details       |

---

## 👤 User Model Schema

```js
{
  name:        { type: String, required: true, trim: true },
  email:       { type: String, required: true, unique: true, lowercase: true },
  phone:       { type: String, required: true, unique: true },
  password:    { type: String, required: true },
  profileImage:{ type: String, required: true },
  role:        { type: String, enum: ["user", "admin"], default: "user" }
}
```

---

## 📦 Product Model Schema

```js
{
  image:        { type: String, required: true },
  product_name: { type: String, required: true },
  desc:         { type: String, required: true },
  mrp:          { type: Number, required: true },
  salesPrice:   { type: Number, required: true },
  colors:       { type: String },
  ratings:      { type: Number, default: 0, min: 0, max: 5 },
  product_type: { type: String, enum: ['Mens', 'Womans', 'Boy', 'Girl', 'Baby'], required: true },
  categories:   { type: String, enum: ['Shirts', 'T-shirts', 'Jeans', 'Dresses', 'Footwear'], required: true },
  brands:       { type: String, required: true },
  totalStock:   { type: Number, default: 0 }
}
```

---

## 🔐 Middleware

- **`isAuthenticated`** – Validates JWT token.
- **`isAuthorized`** – Checks if user has admin privileges.
- **`validate(schema)`** – Validates request body using Joi schema.

---

## 📖 Swagger API Documentation (Optional)

You can integrate Swagger using:

```bash
npm install swagger-ui-express yamljs
```

Sample setup in `app.js`:

```js
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
```

Then visit:

```
http://localhost:5000/api-docs
```

---

## 📬 Contact

For bug reports, feature requests, or contributions, feel free to open an issue.

---

**Made with ❤️ using Node.js + Express + MongoDB**
