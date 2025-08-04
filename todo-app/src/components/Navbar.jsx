import React from 'react';
import todoImage from '../assets/todo.jpeg'; 
const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src={todoImage} alt="Todo App" className="h-10 w-10" />
          <span className="text-xl font-bold text-violet-700">TodoApp</span>
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;