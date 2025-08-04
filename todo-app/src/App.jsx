import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Navbar from './components/Navbar';

function App() {
 const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(() => {
    // Initialize state directly from localStorage
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [editingId, setEditingId] = useState(null);
  const [showFinished, setshowFinished] = useState(true)
 
  // Save todos whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const toggleFinished=()=>{
    setshowFinished(!showFinished)
  }

  const handleSubmit = () => {
    const trimmedTodo = todo.trim();

    if (editingId) {
      setTodos(todos.map(item =>
        item.id === editingId ? { ...item, todo: trimmedTodo } : item
      ));
      setEditingId(null);

    } else {
      setTodos([...todos, {
        id: uuidv4(),
        todo: trimmedTodo,
        isCompleted: false
      }]);
    }

    setTodo("");
  };

  const handleEdit = (id) => {
    const todoToEdit = todos.find(item => item.id === id);
    if (todoToEdit) {
      setTodo(todoToEdit.todo);
      setEditingId(id);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      setTodos(todos.filter(item => item.id !== id));
    }
  };

  const handleToggleComplete = (id) => {
    setTodos(todos.map(item =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    ));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

 
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto p-4 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-8">

          {/* Left Section - Todo Input */}
          <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-6 text-violet-700">
              {editingId ? "Edit Todo" : "Add New Todo"}
            </h1>
            
            <div className="mb-6">
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  value={todo}
                  onChange={(e) => {
                    setTodo(e.target.value);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="What needs to be done?"
                  className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                <button
                  onClick={handleSubmit}
                  disabled={!todo.trim()}
                  className={`px-4 py-3 rounded-lg text-white font-medium ${
                    !todo.trim() 
                      ? "bg-gray-400 cursor-not-allowed" 
                      : editingId 
                        ? "bg-blue-600 hover:bg-blue-700" 
                        : "bg-violet-600 hover:bg-violet-700"
                  }`}
                >
                  {editingId ? "Update Todo" : "Add Todo"}
                </button>
              </div>
            </div>

          </div>

          {/* Right Section - Todo List (Always Visible) */}
          <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow">
            <input onChange={toggleFinished} type="checkbox" checked={showFinished} name="" id="" /> Show Finished
            <h2 className="text-2xl font-bold mb-6 text-violet-700">Your Todos</h2>
            
            {todos.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No todos yet. Add one to get started!</p>
              </div>
            ) : (
              <ul className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
                {todos.map((item) => (
                   (showFinished || !item.isCompleted) && <li 
                    key={item.id}
                    className={`p-4 border rounded-lg flex items-center justify-between transition-all ${
                      item.isCompleted ? "bg-gray-50 opacity-75" : "bg-white hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <input
                        type="checkbox"
                        checked={item.isCompleted}
                        onChange={() => handleToggleComplete(item.id)}
                        className="h-5 w-5 rounded text-violet-600 focus:ring-violet-500 cursor-pointer"
                      />
                      <span className={`flex-1 ${item.isCompleted ? "line-through text-gray-400" : "text-gray-700"}`}>
                        {item.todo}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="p-2 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-50"
                        title="Edit"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-red-600 hover:text-red-800 rounded-full hover:bg-red-50"
                        title="Delete"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;