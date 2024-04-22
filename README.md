# Musika Marketplace Web Application

This is a web application built with Express.js, MongoDB, HTML, CSS, and JavaScript. It serves as a marketplace where users can create accounts, post advertisements for their products, and browse through available products.

## Features

- User Authentication: Users can create accounts and log in securely.
- Advertisement Management: Users can create, view, edit, and delete advertisements for their products.
- Image Upload: Users can upload images for their product advertisements.
- Admin Panel: Administrators can approve or delete advertisements before they are displayed publicly.
- Search and Filtering: Users can search for products and filter them based on category and price.

## Installation

1. Clone the repository:

```bash
$ git clone https://github.com/BruceICzw/Musika
```

2. Install dependencies

```bash
$ cd marketplace-web-app
$ npm install
```

3. Set up MongoDB

   > Make sure MongoDB is installed and running on your system.

   > Update the MongoDB connection string in config/config.js if necessary.

4. Start the server

```bash
$ npm run start:dev
```

5. Open your web browser and go to `http://localhost:3000` to access the application.

## API Endpoints

### Adverts

- `GET /api/adverts`: Get all approved adverts
- `POST /api/adverts/upload`: Create a new advert (authenticated)
- `GET /api/adverts/:category`: Get approved adverts by category
- `PUT /api/advert/:id`: Update advert by ID (authenticated)
- `DELETE /advert/delete/:id`: Delete advert by ID (authenticated)

### User Profiles

- `GET /api/user/profile`:Get currently logged in user
- `PUT /api/user/profile`: Update profile
- `DELETE /api/user/delete/:id`: Delete profile by ID

### Admin

- `GET /api/admin/pending`: Get all adverts (authenticated)
- `PUT /api/admin/approve/:id`: Approve advert by ID (authenticated)
- `DELETE /api/admin/delete/:id`: Delete advert by ID (authenticated)

### Authentication

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login with username and password to get JWT token

## Request and Response Formats

### Advert Schema:

```json
{
  "image": "image",
  "productName": "String",
  "category": "String",
  "description": "String",
  "price": "Number",
  "time": "String",
  "advertiserContact": "String",
  "approved": "Boolean",
  "user": "ObjectId"
}
```

### User Schema:

```json
{
  "name": "String",
  "surname": "String",
  "email": "String",
  "username": "String",
  "password": "String",
  "role": "String"
}
```

### Authentication:

#### Request:

```json
{
  "username": "String",
  "password": "String"
}
```

#### Response

```json
{
  "token": "JWT Token"
}
```

## Folder Structure

- `public/`: Contains static assets such as CSS, JavaScript, and images.
- `src/`: Contains server-side code, including controllers, models, routes, and views.
- `config/`: Contains configuration files, such as database connection settings.
- `middleware/`: Contains custom middleware functions.
- `uploads/`: Folder to store uploaded images.
- `server.js`: Entry point of the application.

## Dependencies

- `Express.js`: Web framework for Node.js
- `Mongoose`: MongoDB object modeling tool
- `bcryptjs`: Password hashing library
- `jsonwebtoken`: JWT authentication library
- `multer`: Middleware for handling file uploads
- `nodemon`: Library for automatically restarting the server when changes are made
- `cors`: Library for enabling CORS in Express.js
- `cookie-parser`: Library for parsing cookies in Express.js
- `ejs`: Embedded JavaScript templating engine

## Contribution

Contributions are welcome! Feel free to open issues or submit pull requests

## License

This project is licensed under the terms of the MIT license. See the [LICENSE](LICENSE) file for details.
