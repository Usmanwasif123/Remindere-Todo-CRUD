import React from "react";
import { useState } from "react";
import todoContext from "./todoContext";

const TodoState = (props) => {
  const host = "https://jsonplaceholder.typicode.com";

  const todosInitial = [];
  const [todos, setTodos] = useState(todosInitial);

  // Get all todos 
  const getTodos = async () => {
    try {
      const response = await fetch(`${host}/todos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      if (response.ok) {
        const json = await response.json();
        setTodos(json);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    } 
  };

  // Add a todo function 
  const addTodo = async (title, description, dueDate) => {
    try {
      const response = await fetch(`${host}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, dueDate }),
      });
      if (response.ok) {
        const newTodo = await response.json();
        setTodos([...todos, newTodo]);
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };
  // const json = await response.json();
  // console.log(json);

  // Delete a todo 
  const deleteTodo = async (id) => {
    const response = await fetch(`${host}/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = response.json();
    console.log(json);
    //
    const newTodos = todos.filter((todo) => todo._id !== id);
    setTodos(newTodos);
  };

  // Edit a todo
  const editTodo = async (id, title, description, dueDate) => {
    try {
      const response = await fetch(`${host}/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify({ title, description, dueDate }),
      });
      if (response.ok) {
        const updatedTodos = todos.map((todo) =>
          todo._id === id ? { ...todo, title, description, dueDate } : todo
        );
        setTodos(updatedTodos);
      }
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  return (
    <todoContext.Provider
      value={{ todos, getTodos, addTodo, deleteTodo, editTodo }}
    >
      {props.children}
    </todoContext.Provider>
  );
};

export default TodoState;
