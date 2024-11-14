# Car Management System

A full-stack web application that allows users to manage car listings, register, log in, and perform CRUD (Create, Read, Update, Delete) operations on car products. The application is built with **React** on the frontend, **Node.js** with **Express** on the backend, and **MongoDB** for data storage.

---

## Features

- **User Authentication**:
  - User Registration
  - User Login
  - JWT-based Authentication for secure access

- **Product Management**:
  - Create a new car listing
  - View a list of all cars
  - View car details by ID
  - Edit car listings
  - Add images of car
  - Delete car listings
  - Update car details and images

- **Frontend**:
  - Responsive and user-friendly interface
  - Dynamic routing with React Router
  - Form validation and error handling
  - Interactive UI with smooth transitions and animations

- **Backend**:
  - RESTful APIs to handle CRUD operations
  - Token-based authentication for security
  - Error handling and response formatting

- **Search Functionality**:
  - Global search functionality to search through car titles, descriptions, and tags

---

## Technologies Used

- **Frontend**:
  - ReactJS
  - Tailwind CSS
  - Axios for HTTP requests
  - React Router for routing

- **Backend**:
  - Node.js
  - Express
  - MongoDB (using Mongoose for data modeling)
  - JWT (JSON Web Token) for authentication
  - Bcrypt for password protection

- **Development Tools**:
  - Postman for API testing
  - Git for version control

---

### Setup

1. Backend:
   ```bash
   git clone https://github.com/your-username/car-management-system.git
   cd car-management-system
   cd backend/
   npm install
   npm start
   ```
2. Frontend:
   ```bash
   cd car-management-system
   cd CarManagement/frontend
   npm install
   npm run dev
   ```
