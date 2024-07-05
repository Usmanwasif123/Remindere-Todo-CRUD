const express = require('express');
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Todos = require("../models/Todos");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get all the todos from JSONPlaceholder API: GET "/fetchtodos". Login required
router.get('/fetchtodos', fetchUser, async (req, res) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    if (!response.ok) {
      throw new Error('Failed to fetch todos from JSONPlaceholder');
    }
    const todos = await response.json();
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// ROUTE 2: Add new todos to JSONPlaceholder API: POST "/addtodos". Login required
router.post('/addtodos', fetchUser, async (req, res) => {
  const { title, description, dueDate } = req.body;

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        dueDate,
        userId: req.user.id  // Assuming req.user.id is available and suitable for userId in JSONPlaceholder
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to add todo to JSONPlaceholder');
    }

    const newTodo = await response.json();
    res.json(newTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});


// ROUTE 3: Update a todo on JSONPlaceholder API: PUT "/updatetodo/:id". Login required
router.put('/updatetodo/:id', fetchUser, async (req, res) => {
  const { title, description, dueDate } = req.body;

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${req.params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: req.params.id,
        title,
        description,
        dueDate,
        userId: req.user.id  // Assuming req.user.id is available and suitable for userId in JSONPlaceholder
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update todo on JSONPlaceholder');
    }

    const updatedTodo = await response.json();
    res.json(updatedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// ROUTE 4: Delete a todo on JSONPlaceholder API: DELETE "/deletetodo/:id". Login required
router.delete('/deletetodo/:id', fetchUser, async (req, res) => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${req.params.id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete todo on JSONPlaceholder');
    }

    const deletedTodo = { success: 'Todo has been deleted' };
    res.json(deletedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
