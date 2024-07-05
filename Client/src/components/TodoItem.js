import React, { useContext } from 'react';
import todoContext from '../context/todos/todoContext';

const TodoItem = (props) => {
  const context = useContext(todoContext);
  const { deleteTodo } = context;
  const { todo, updateTodo } = props;

  const getRandomColor = () => {
    const predefinedColors = ['#ECEE81', '#8DDFCB', '#82A0D8', '#EDB7ED'];
    const randomIndex = Math.floor(Math.random() * predefinedColors.length);
    return predefinedColors[randomIndex];
  };

  const bgColor = getRandomColor();

  return (
    // Remove the unnecessary div element
      <div style={{ backgroundColor: bgColor }} className='p-4 rounded-lg mt-8'>
        <h5 className="text-2xl text-gray-800 font-bold mb-2">{todo.title}</h5>
        <p className="text-xl text-gray-800">{todo.description}.</p>
        <h6 className="text-lg text-right font-semibold text-gray-700 mb-2">Due: {todo.dueDate}</h6>
        <div className="text-right mt-4">
          <i
            className="fas fa-trash text-gray-800 cursor-pointer mr-4"
            onClick={() => {
              deleteTodo(todo._id);
            }}
          ></i>
          <i
            className="fas fa-edit text-gray-800 cursor-pointer"
            onClick={() => updateTodo(todo)}
          ></i>
        </div>
      </div>

  );
};

export default TodoItem;
