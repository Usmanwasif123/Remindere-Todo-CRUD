# The Remindere - MERN Stack CRUD Todo App

The Remindere is a full-stack CRUD Todo app developed using the MERN stack (MongoDB, Express.js, React.js, Node.js). It comes with authentication, allowing users to manage their tasks by adding titles, descriptions, and due dates. Additionally, users can edit or delete existing todos to keep their tasks organized.

## Features

- **User Authentication:**
  - Secure user authentication to ensure data privacy and personalization.

- **Create, Read, Update, Delete (CRUD) Functionality:**
  - Add new todos with a title, description, and due date.
  - View existing todos with essential details.
  - Edit todos to update information.
  - Delete unwanted todos to keep the list clean.

- **Tailwind CSS Styling:**
  - The application is styled using Tailwind CSS, providing a clean and modern user interface.

## Technologies Used

- **Frontend:**
  - React.js
  - Tailwind CSS

- **Backend:**
  - Node.js with Express.js

- **Database:**
  - MongoDB

## Getting Started

1. **Install Dependencies:**
   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

2. **Set Up MongoDB:**
   - Create a MongoDB database and update the connection string in `server/config/config.js`.

3. **Run the Application:**
   ```bash
   # Start the backend server
   cd server
   npm start

   # Start the frontend development server
   cd ../client
   npm start
   ```

   The app should now be accessible at `http://localhost:3000/`.

## Configuration

- **MongoDB Connection:**
  - Update the MongoDB connection string in `server/config/config.js`.

## Contributing

Contributions are welcome! Feel free to submit pull requests or raise issues.

Thank you for using The Remmindere! Happy note-taking!
