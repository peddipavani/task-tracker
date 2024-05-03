import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10');
    setTasks(response.data);
  };

  const addTask = async () => {
    if (!newTaskTitle.trim()) return;

    const newTask = {
      userId: 1,
      title: newTaskTitle,
      completed: false,
    };

    await axios.post('https://jsonplaceholder.typicode.com/todos', newTask);
    setNewTaskTitle('');
    fetchTasks();
  };

  const deleteTask = async id => {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    fetchTasks();
  };

  const toggleTaskCompletion = async id => {
    const task = tasks.find(task => task.id === id);
    const updatedTask = { ...task, completed: !task.completed };

    await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, updatedTask);
    fetchTasks();
  };

  return (
    <div className="App">
      <h1>Task Tracker</h1>
      <div className="add-task">
        <input
          type="text"
          placeholder="Add Task..."
          value={newTaskTitle}
          onChange={e => setNewTaskTitle(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <div className="task-list">
        {tasks.map(task => (
          <div key={task.id} className={`task ${task.completed ? 'completed' : ''}`}>
            <span>{task.title}</span>
            <div>
              <button onClick={() => toggleTaskCompletion(task.id)}>
                {task.completed ? 'Undo' : 'Complete'}
              </button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
