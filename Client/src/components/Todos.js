import React, { useContext, useEffect, useRef, useState } from 'react';
import AddTodo from './AddTodo';
import TodoItem from './TodoItem';
import todoContext from '../context/todos/todoContext';
import { useNavigate } from 'react-router-dom';

const Todos = () => {
  const context = useContext(todoContext);
  const { todos, getTodos, editTodo } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getTodos();
    } else {
      navigate('/');
    }
    //eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const [todo, setTodo] = useState({ id: '', etitle: '', edescription: '', edueDate: '' });

  const updateTodo = (currentTodo) => {
    setTodo({
      id: currentTodo._id,
      etitle: currentTodo.title,
      edescription: currentTodo.description,
      edueDate: currentTodo.dueDate,
    });
    // Open the modal
    ref.current.classList.remove('hidden');
  };

  const onChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const handleclick = (e) => {
    editTodo(todo.id, todo.etitle, todo.edescription, todo.edueDate);
    // Close the modal
    ref.current.classList.add('hidden');
  };

  return (
    <>
      <AddTodo />
      <h2 className='text-2xl mt-8 font-bold text-gray-200'>Your Todos</h2>
      <div className="grid xl:grid-cols-4 md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-x-20">
        {Array.isArray(todos) && todos.length > 0 ? (
          todos.map((todo) => (
            <TodoItem key={todo.id} updateTodo={updateTodo} todo={todo} />
          ))
        ) : (
          <p className="mx-1">No todos found</p>
        )}
      </div>

      {/* Tailwind CSS Modal */}
      <div className="fixed z-10 inset-0 overflow-y-auto hidden" aria-labelledby="modal-title" role="dialog" aria-modal="true" ref={ref}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div
            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="bg-[#28231D] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="container">
                <div className="mb-3">
                  <label htmlFor="etitle" className="block text-lg font-medium text-[#ECEE81]">
                    Title
                  </label>
                  <input
                    type="text"
                    value={todo.etitle}
                    className="mt-1 p-2 text-black w-full border rounded-md"
                    id="etitle"
                    name="etitle"
                    placeholder="Add a title.."
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="block text-lg font-medium text-[#82A0D8]">
                    Description
                  </label>
                  <textarea
                   className="mt-1 p-2 w-full text-black border rounded-md"
                    value={todo.edescription}
                    id="edescription"
                    name="edescription"
                    rows="1"
                    onChange={onChange}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="edueDate" className="block text-lg font-medium text-[#EDB7ED]">
                    Due Date
                  </label>
                  <textarea
                    className="mt-1 p-2 text-black w-full border rounded-md"
                    value={todo.edueDate}
                    id="edueDate"
                    name="edueDate"
                    rows="1"
                    onChange={onChange}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="bg-[#28231D] px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="mx-4 max-w-sm bg-blue-500 hover:via-pink-600 hover:bg-blue-600 focus:outline-none text-white text-md uppercase font-bold shadow-md rounded-lg px-4 py-2"
                onClick={handleclick}
              >
                Update todo
              </button>
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white hover:bg-red-300 bg-red-500 border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                onClick={() => ref.current.classList.add('hidden')}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todos;