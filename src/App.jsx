import { useState, useEffect } from 'react'

import './App.css'

let initialTodos = [
  { id: Date.now(), text: 'Learn React', completed: false },
  { id: Date.now() + 1, text: 'Build a Todo App', completed: false },
  { id: Date.now() + 2, text: 'Master JavaScript', completed: false }
]


function App() {

  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : initialTodos;
  });
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }
  function addTodo() {
    if (inputValue.trim() !== '') {

      setTodos(prev => [...prev, { id: Date.now(), text: inputValue, completed: false }]);
      setInputValue('');
    }
  }

  function deleteTodo(id) {
    setTodos(prev => prev.filter((todo) => todo.id !== id))

  }

  function toggleComplete(id) {
    setTodos(prev => prev.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed }
      }
      return todo;
    }))
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === "Active") return !todo.completed;
    if (filter === "Completed") return todo.completed;
    return true;
  });


  return (
    <>

      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl">

          <h1 className='text-4xl font-extrabold text-center mb-4 text-gray-900'>Todo List</h1>
          <div className='flex justify-center gap-2 mb-4'>
            <button className={`px-3 py-1 rounded-lg text-sm transition ${filter === "All"
              ? "bg-black text-white"
              : "bg-gray-200 hover:bg-gray-300"
              }`} onClick={() => setFilter("All")}>All</button>
            <button className={`px-3 py-1 rounded-lg text-sm transition ${filter === "Active"
              ? "bg-black text-white"
              : "bg-gray-200 hover:bg-gray-300"
              }`} onClick={() => setFilter("Active")}>Active</button>
            <button className={`px-3 py-1 rounded-lg text-sm transition ${filter === "Completed"
              ? "bg-black text-white"
              : "bg-gray-200 hover:bg-gray-300"
              }`} onClick={() => setFilter("Completed")}>Completed</button>
          </div>
          <ul className="max-h-64 overflow-y-auto overflow-x-hidden space-y-2">

            {filteredTodos.length === 0 && (
              <p className="text-center text-gray-400 mt-4">
                No todos found
              </p>
            )}
            {
              filteredTodos.map((todo) => (
                <div className='flex items-center gap-4 justify-between' key={todo.id}>
                <li
                 
                  className="flex items-center justify-between bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition hover:scale-[1.02] cursor-pointer select-none min-w-70 overflow-hidden"
                   onClick={() => toggleComplete(todo.id)}

                >
                  <div className="flex items-center gap-2">
                    <span className={`${todo.completed ? "block" : "hidden"}`}>✅</span>
                    <span
                     
                      className={`cursor-pointer ${todo.completed ? "line-through text-gray-400" : ""
                        }`}
                    >
                      {todo.text}
                    </span>
                   
                  </div>

                   


                </li>

                <button
                      onClick={() => deleteTodo(todo.id)}
                      className="text-red-500 hover:text-red-700 transition cursor-pointer hover:scale-130 mr-4"
                    >
                      ❌
                    </button>
</div>

              ))


            }

          </ul>

          <div className="flex gap-2 mt-4">
            <input
              autoFocus
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === "Enter" && addTodo()}
              placeholder="Add a todo..."
              className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />

            <button
              onClick={addTodo}
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Add
            </button>
          </div>
        </div>
      </div>




    </>
  )
}

export default App
