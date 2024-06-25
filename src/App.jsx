import React, { useState, useEffect } from 'react';
import { getTodos, addTodo, updateTodo, deleteTodo } from './services/todoService';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const todos = await getTodos();
    setTodos(todos);
  };

  const handleAddTodo = async () => {
    if (text.trim() === '') return;
    const newTodo = await addTodo(text);
    setTodos([...todos, newTodo]);
    setText('');
  };

  const handleToggleComplete = async (id, completed) => {
    const updatedTodo = await updateTodo(id, { completed: !completed });
    setTodos(todos.map(todo => todo._id === id ? updatedTodo : todo));
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Todo List</h1>
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-2 border rounded mb-2"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter a new todo"
          />
          <button
            className="w-full bg-blue-500 text-white p-2 rounded"
            onClick={handleAddTodo}
          >
            Add Todo
          </button>
        </div>
        <ul className="list-disc pl-5">
          {todos.map(todo => (
            <li key={todo._id} className="flex justify-between items-center mb-2">
              <span
                onClick={() => handleToggleComplete(todo._id, todo.completed)}
                className={`cursor-pointer ${todo.completed ? 'line-through text-gray-500' : ''}`}
              >
                {todo.text}
              </span>
              <button
                className="bg-red-500 text-white p-1 rounded"
                onClick={() => handleDeleteTodo(todo._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoApp;
