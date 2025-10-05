# JainConnect Backend API

A RESTful API for the JainConnect application, providing endpoints for user authentication, events, maharajs, and tithis management.

## Features

- User authentication (register, login, forgot password, reset password)
- User profile management
- Events management with image upload
- Maharajs information management with image upload
- Tithis (Jain calendar dates) management
- Cloudinary integration for image storage
- JWT-based authentication

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT for authentication
- Cloudinary for image storage
- Bcrypt for password hashing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ```

### Running the Server

```
npm start
```

The server will run on http://localhost:5000 by default.

## API Endpoints

### Authentication

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login a user
- `POST /api/users/forgot-password` - Request password reset
- `POST /api/users/reset-password` - Reset password with token

### Users

- `GET /api/users` - Get all users (protected)
- `GET /api/users/profile` - Get current user profile (protected)
- `GET /api/users/:id` - Get user by ID (protected)
- `PUT /api/users/profile` - Update user profile (protected)
- `PUT /api/users/profile/image` - Update profile image (protected)

### Events

- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create a new event (protected)
- `POST /api/events/with-image` - Create a new event with image (protected)
- `PUT /api/events/:id` - Update an event (protected)
- `PUT /api/events/:id/with-image` - Update an event with image (protected)
- `DELETE /api/events/:id` - Delete an event (protected)

### Maharajs

- `GET /api/maharajs` - Get all maharajs
- `GET /api/maharajs/:id` - Get maharaj by ID
- `POST /api/maharajs` - Create a new maharaj (protected)
- `POST /api/maharajs/with-image` - Create a new maharaj with image (protected)
- `PUT /api/maharajs/:id` - Update a maharaj (protected)
- `PUT /api/maharajs/:id/with-image` - Update a maharaj with image (protected)
- `DELETE /api/maharajs/:id` - Delete a maharaj (protected)

### Tithis

- `GET /api/tithis` - Get all tithis
- `GET /api/tithis/:id` - Get tithi by ID
- `POST /api/tithis` - Create a new tithi (protected)
- `PUT /api/tithis/:id` - Update a tithi (protected)
- `DELETE /api/tithis/:id` - Delete a tithi (protected)

## Postman Collection

A Postman collection is included in the repository for testing the API endpoints. Import the `postman-collection-simple.json` file into Postman to get started.

## License

This project is licensed under the MIT License.