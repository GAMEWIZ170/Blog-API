# 📚 Blog REST API Service

A production-ready RESTful API backend built with **Node.js**, **Express**, **MongoDB Atlas**, **Mongoose**, **Joi**, and **JWT Authentication**.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v16.x` or higher
- **MongoDB**: Local MongoDB instance or a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster URL

### Installation & Local Setup

1. **Clone the repository:**
   ```bash
   git clone <YOUR_REPOSITORY_URL>
   cd <YOUR_REPOSITORY_DIRECTORY>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and define the following variables:
   ```env
   PORT=3000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/blog-db
   JWT_SECRET=your_super_secret_jwt_key
   ```

4. **Start the server:**
   ```bash
   # Development mode with nodemon
   npm run dev

   # Production mode
   npm start
   ```

---

## 🔐 Authentication Endpoints

Base Route: `/api/users`

### 1. User Signup
Registers a new user account with hashed password storage using `bcrypt`.

- **HTTP Method:** `POST`
- **Endpoint:** `/signup`
- **Auth Required:** `No`
- **Headers:** `Content-Type: application/json`
- **Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

- **Validation Rules (Joi):**
  - `name`: String, required, 5–20 characters.
  - `email`: Valid email format, required.
  - `password`: String, required, min 8 characters.

- **Response (`200 OK`):**
```json
{
  "message": "User registered successfully"
}
```

- **Error Response (`400 Bad Request`):**
```json
{
  "message": "User already exists"
}
```

---

### 2. User Login
Authenticates user credentials and returns a signed JSON Web Token (JWT).

- **HTTP Method:** `POST`
- **Endpoint:** `/login`
- **Auth Required:** `No`
- **Headers:** `Content-Type: application/json`
- **Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

- **Response (`200 OK`):**
```json
{
  "message": "User logged in successfully",
  "resUser": {
    "_id": "650000000000000000000000",
    "email": "john@example.com",
    "name": "John Doe"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 📄 Article Endpoints

Base Route: `/api/articles`

### 1. Create Article
Creates a new blog post linked to the authenticated user ID.

- **HTTP Method:** `POST`
- **Endpoint:** `/`
- **Auth Required:** `Yes` (`Bearer <token>`)
- **Headers:** 
  - `Content-Type: application/json`
  - `Authorization: Bearer <YOUR_JWT_TOKEN>`
- **Request Body:**

```json
{
  "title": "Mastering Express and Node.js",
  "content": "Comprehensive guide covering Express routing, controller modularization, and MongoDB indexing."
}
```

- **Response (`201 Created`):**
```json
{
  "message": "Article created successfully",
  "data": {
    "_id": "650000000000000000000001",
    "title": "Mastering Express and Node.js",
    "content": "Comprehensive guide covering Express routing...",
    "author": "650000000000000000000000",
    "createdAt": "2026-09-27T20:00:00.000Z"
  }
}
```

---

### 2. Get All Articles
Retrieves a paginated list of articles sorted by newest first (`createdAt: -1`) with populated author details.

- **HTTP Method:** `GET`
- **Endpoint:** `/`
- **Auth Required:** `No`
- **Query Parameters:**
  - `page` *(optional, default: 1)*: Page number
  - `limit` *(optional, default: 10)*: Items per page

- **Response (`200 OK`):**
```json
{
  "message": "Articles fetched successfully",
  "data": [
    {
      "_id": "650000000000000000000001",
      "title": "Mastering Express and Node.js",
      "content": "Comprehensive guide covering Express routing...",
      "author": {
        "_id": "650000000000000000000000",
        "name": "John Doe",
        "email": "john@example.com"
      }
    }
  ]
}
```

---

### 3. Search Articles
Executes MongoDB full-text search (`$text`, `$search`) across indexed title and content fields.

- **HTTP Method:** `GET`
- **Endpoint:** `/search`
- **Auth Required:** `No`
- **Query Parameters:**
  - `q` *(required)*: Search query string term

- **Response (`200 OK`):**
```json
{
  "message": "Search query executed successfully",
  "count": 1,
  "data": [
    {
      "_id": "650000000000000000000001",
      "title": "Mastering Express and Node.js",
      "content": "Comprehensive guide covering Express routing...",
      "score": 1.5
    }
  ]
}
```

---

### 4. Get Article by ID
Retrieves a single article document by its MongoDB Object ID.

- **HTTP Method:** `GET`
- **Endpoint:** `/:id`
- **Auth Required:** `No`

- **Response (`200 OK`):**
```json
{
  "message": "Article fetched successfully",
  "data": {
    "_id": "650000000000000000000001",
    "title": "Mastering Express and Node.js",
    "content": "Comprehensive guide covering Express routing..."
  }
}
```

---

### 5. Update Article by ID
Updates specified fields of an existing article document.

- **HTTP Method:** `PUT`
- **Endpoint:** `/:id`
- **Auth Required:** `Yes` (`Bearer <token>`)
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer <YOUR_JWT_TOKEN>`
- **Request Body:**

```json
{
  "title": "Updated Express and Node.js Guide"
}
```

- **Response (`200 OK`):**
```json
{
  "message": "Article updated successfully",
  "data": {
    "_id": "650000000000000000000001",
    "title": "Updated Express and Node.js Guide",
    "content": "Comprehensive guide covering Express routing..."
  }
}
```

---

### 6. Delete Article by ID
Deletes an article record permanently from the database.

- **HTTP Method:** `DELETE`
- **Endpoint:** `/:id`
- **Auth Required:** `Yes` (`Bearer <token>`)
- **Headers:**
  - `Authorization: Bearer <YOUR_JWT_TOKEN>`

- **Response (`200 OK`):**
```json
{
  "message": "Article deleted successfully"
}
```

---

## 📦 Postman Collection Import

To quickly import all endpoints into Postman:

1. Copy the JSON structure below and save it locally as **`postman_collection.json`**.
2. Open Postman, click **Import**, and select the file.
3. Configure the `baseUrl` variable to point to your local or deployed API URL (e.g., `http://localhost:3000`).

```json
{
  "info": {
    "name": "Complete Blog API Collection",
    "description": "Full Postman collection for User Authentication, Article CRUD, and Full-Text Search.",
    "schema": "[https://schema.getpostman.com/json/collection/v2.1.0/collection.json](https://schema.getpostman.com/json/collection/v2.1.0/collection.json)"
  },
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:3000",
      "type": "string"
    },
    {
      "key": "token",
      "value": "YOUR_JWT_TOKEN_HERE",
      "type": "string"
    }
  ],
  "item": [
    {
      "name": "User Auth",
      "item": [
        {
          "name": "User Signup",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"John Doe\",\n  \"email\": \"john@example.com\",\n  \"password\": \"password123\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/users/signup",
              "host": ["{{baseUrl}}"],
              "path": ["api", "users", "signup"]
            }
          }
        },
        {
          "name": "User Login",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"john@example.com\",\n  \"password\": \"password123\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/users/login",
              "host": ["{{baseUrl}}"],
              "path": ["api", "users", "login"]
            }
          }
        }
      ]
    },
    {
      "name": "Articles",
      "item": [
        {
          "name": "Create Article",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              },
              {
                "key": "Authorization",
                "value": "Bearer {{token}}"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"title\": \"Mastering Express and Node.js\",\n  \"content\": \"Comprehensive guide covering Express routing, controllers, and indexing.\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/articles",
              "host": ["{{baseUrl}}"],
              "path": ["api", "articles"]
            }
          }
        },
        {
          "name": "Get All Articles",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/articles?page=1&limit=10",
              "host": ["{{baseUrl}}"],
              "path": ["api", "articles"],
              "query": [
                {
                  "key": "page",
                  "value": "1"
                },
                {
                  "key": "limit",
                  "value": "10"
                }
              ]
            }
          }
        },
        {
          "name": "Search Articles",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/articles/search?q=Express",
              "host": ["{{baseUrl}}"],
              "path": ["api", "articles", "search"],
              "query": [
                {
                  "key": "q",
                  "value": "Express"
                }
              ]
            }
          }
        },
        {
          "name": "Get Article by ID",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/articles/:id",
              "host": ["{{baseUrl}}"],
              "path": ["api", "articles", ":id"],
              "variable": [
                {
                  "key": "id",
                  "value": "ARTICLE_MONGO_ID_HERE"
                }
              ]
            }
          }
        },
        {
          "name": "Update Article by ID",
          "request": {
            "method": "PUT",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              },
              {
                "key": "Authorization",
                "value": "Bearer {{token}}"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"title\": \"Updated Express and Node.js Guide\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/articles/:id",
              "host": ["{{baseUrl}}"],
              "path": ["api", "articles", ":id"],
              "variable": [
                {
                  "key": "id",
                  "value": "ARTICLE_MONGO_ID_HERE"
                }
              ]
            }
          }
        },
        {
          "name": "Delete Article by ID",
          "request": {
            "method": "DELETE",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{token}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/articles/:id",
              "host": ["{{baseUrl}}"],
              "path": ["api", "articles", ":id"],
              "variable": [
                {
                  "key": "id",
                  "value": "ARTICLE_MONGO_ID_HERE"
                }
              ]
            }
          }
        }
      ]
    }
  ]
}
```
