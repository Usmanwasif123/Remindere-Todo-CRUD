import React, { useContext, useState } from 'react';
import todoContext from '../context/todos/todoContext';

const AddTodo = () => {
  const context = useContext(todoContext);
  const { addTodo } = context;

  const [todo, setTodo] = useState({ title: '', description: '', dueDate: '' });
  const [error, setError] = useState('');

  const handleclick = (e) => {
    e.preventDefault();
    if (!localStorage.getItem('token')) {
      setError('You need to login to add todos.');
      return;
    }
    addTodo(todo.title, todo.description, todo.dueDate);
    setTodo({
      title: '',
      description: '',
      dueDate: '',
    });
    setError('');
  };

  const onChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  return (
    <div className="my-1 lg:my-3">
      <h1 className="text-2xl font-bold text-blue-500">Add a Todo</h1>
      <div className="my-4">
        <label htmlFor="title" className="block text-lg font-medium text-gray-200">
          Title
        </label>
        <input
          type="text"
          value={todo.title}
          className="mt-1 p-2 text-black w-full border rounded-md"
          id="title"
          name="title"
          placeholder="Add a title.."
          onChange={onChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="block text-lg font-medium text-gray-200">
          Description
        </label>
        <textarea
          className="mt-1 p-2 w-full text-black border rounded-md"
          value={todo.description}
          id="description"
          name="description"
          placeholder="Describe your task.."
          rows="3"
          onChange={onChange}
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="dueDate" className="block text-lg font-medium text-gray-200">
          Due Date
        </label>
        <input
          type="text"
          value={todo.dueDate}
          className="mt-1 p-2 text-black w-full border rounded-md"
          id="dueDate"
          name="dueDate"
          placeholder="Task due date.."
          onChange={onChange}
        />
      </div>
      {error && <p className="text-lg text-red-500 font-bold mb-4">{error}</p>}
      <button
        type="button"
        className="max-w-sm bg-blue-500 hover:bg-red-600 focus:outline-none text-white text-md uppercase font-bold shadow-md rounded-lg mx-auto px-4 py-2"
        onClick={handleclick}
      >
        Add todo
      </button>
    </div>
  );
};

export default AddTodo;
