import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate(); // To navigate programmatically after logout

  // Logout function
  const logoutHandler = () => {
    localStorage.removeItem('userInfo'); // Remove user data from localStorage
    navigate('/login'); // Redirect to login page after logging out
  };

  const userInfo = localStorage.getItem('userInfo'); // Check if the user is logged in

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">Car Management</div>
        <div className="space-x-4">
          {/* Public Links */}
          {!userInfo ? (
            <>
              <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
              <Link to="/signup" className="text-white hover:text-gray-300">Sign Up</Link>
            </>
          ) : (
            <>
              {/* Protected Links */}
              <Link to="/dashboard" className="text-white hover:text-gray-300">Dashboard</Link>
              <Link to="/products" className="text-white hover:text-gray-300">Product List</Link>
              <Link to="/product/create" className="text-white hover:text-gray-300">Product Creation</Link>
              <button
  onClick={logoutHandler}
  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300"
>
  Logout
</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
