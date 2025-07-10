# [Image Processing Service]

## Overview

Image Processing Service is a web application that allows users to upload, transform, and manage images. The application provides functionalities such as:

- Image resizing, cropping, and rotating
- Applying filters like grayscale and sepia
- User authentication and secure API endpoints

## Features

- **User Authentication** (Registration & Login)
- **Image Upload**
- **Image Transformation** (Resize, Crop, Rotate, Apply Filters)
- **Image Listing & Retrieval**
- **Secure API Endpoints** with JWT Authentication

## Project Structure

The project is organized into several directories:

```
├── config        # Configuration files
├── controllers   # Handles requests & business logic
├── middlewares   # Middleware functions
├── models        # Mongoose models for MongoDB
├── routes        # API route definitions
├── utils         # Utility functions
├── views         # HTML views (if applicable)
├── uploads       # Directory for uploaded images
```

## Installation

### 1. Clone the Repository

```sh
git clone https://github.com/yourusername/Martin_image-processing_service
cd Martin_image-processing-service
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add the following:

```
PORT=5000
DATABASE_URL=mongodb://localhost:27017/<your_db_name>
SECRET_KEY=your_secret_key
```

### 4. Start the Server

```sh
npm run start:dev
```

## API Usage

### **1. Register a New User**

```http
POST /auth/register
```

**Request Body:**

```json
{
  "username": "your_username",
  "password": "your_password",
  "email": "your_email"
}
```

### **2. Login**

```http
POST /auth/login
```

**Request Body:**

```json
{
  "email": "your_password",
  "password": "your_password"
}
```

### **3. Upload an Image**

```http
POST /images
```

**Headers:**

```json
{ "Authorization": "Bearer your_jwt_token" }
```

**Body:** (Multipart Form Data)

```
image: file
```

### **4. Transform an Image**

```http
POST /images/:id/transform
```

**Headers:**

```json
{ "Authorization": "Bearer your_jwt_token" }
```

**Request Body:**

```json
{
  "transformations": {
    "resize": { "width": 100, "height": 100 }
  }
}
```

### **5. Retrieve an Image**

```http
GET /images/:id
```

**Headers:**

```json
{ "Authorization": "Bearer your_jwt_token" }
```

### **6. List Images**

```http
GET /images
```

**Headers:**

```json
{ "Authorization": "Bearer your_jwt_token" }
```

**Query Parameters:**

```json
{
  "page": 1,
  "limit": 10
}
```
