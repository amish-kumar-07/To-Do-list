import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  // Fetch all to-do items
  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3001/todos');
      setTodos(response.data);
    } catch (err) {
      console.error('Error fetching to-do items', err);
    }
  };

  // Add a new to-do item
  const addTodo = async () => {
    try {
      await axios.post('http://localhost:3001/todos', { item: inputValue });
      setInputValue('');
      fetchTodos(); // Refresh the list after adding a new item
    } catch (err) {
      console.error('Error adding to-do item', err);
    }
  };

  // Delete a to-do item
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/todos/${id}`);
      fetchTodos(); // Refresh the list after deleting an item
    } catch (err) {
      console.error('Error deleting to-do item', err);
    }
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.item}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter a to-do item"
      />
      <button onClick={addTodo}>Add To-Do</button>
    </div>
  );
}

export default App;
