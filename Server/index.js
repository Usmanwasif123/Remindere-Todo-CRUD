const express = require("express");
const app = express();
const port = 5000;
const cors = require('cors');

app.use(cors(
  {
      origin: ["http://localhost:3000"],
      methods: ["POST", "GET" ,"PUT", "DELETE"],
      credentials: true
  }
));

// Available routes
app.use(express.json());

// Connect to MongoDB
require("./db")(); // Assuming db.js exports a function for connecting to MongoDB

app.use("/api/auth", require("./routes/auth"));
app.use("/api/todos", require("./routes/todos"));

// Start the server
const server = app.listen(port, () => {
  console.log(`Todo-backend listening on port ${port}`);
});

//shutdown
process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Shutting down gracefully');
  server.close(() => {
    process.exit(0);
  });
});
