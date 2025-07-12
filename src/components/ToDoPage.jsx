import { useState, useEffect } from "react";

export default function Cards() {
  let [task, setTask] = useState("");
  let [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    console.log(localStorage.getItem("todos"));
  }, [todos]);

  const addTask = () => {
    if (task.trim() === "") return;
    const newTask = {
      id: Date.now(),
      text: task.trim(),
      completed: false,
    };
    console.log(newTask);
    setTodos([...todos, newTask]);
    setTask("");
  };

  const editTask = (id) => {};

  const deleteTask = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id != id);
    setTodos(updatedTodos);
  };

  const toggleCompleted = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="container mx-auto p-4 md:p-8 bg-gray-800 rounded-lg shadow-xl max-w-lg w-full">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center text-white">
          My To-Do List
        </h1>

        <div className="flex flex-col md:flex-row mb-4">
          <input
            type="text"
            value={task}
            placeholder="Add a new task"
            onChange={(e) => setTask(e.target.value)}
            className="w-full md:w-2/3 p-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 mb-2 md:mb-0 md:mr-2 text-white text-1xl"
          />
          <button
            className="w-full md:w-1/3 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
            onClick={addTask}
          >
            Add Task
          </button>
        </div>

        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-gray-600 p-3 rounded-lg shadow-md"
            >
              <span className="text-white text-lg md:text-xl">{todo.text}</span>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  onChange={() => toggleCompleted(todo.id)}
                  className="form-checkbox text-blue-500 h-5 w-5"
                />
                <button
                  onClick={() => deleteTask(todo.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
