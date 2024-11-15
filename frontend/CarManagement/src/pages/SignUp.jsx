import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Initialize the useNavigate hook
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setError('');
      
      const { data } = await axios.post(`https://car-management-application-nhas.onrender.com
/api/users/register`, { name, email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      
      // Use navigate() instead of history.push()
      navigate('/products');  // Redirect to the products page
    } catch (error) {
      setError('Failed to register. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-lg transform transition duration-500 hover:shadow-2xl">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-purple-600">Create Account</h2>

        {error && <p className="text-red-600 text-center font-semibold mb-4">{error}</p>}

        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow-sm appearance-none border border-gray-300 rounded-full w-full py-3 px-5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow-sm appearance-none border border-gray-300 rounded-full w-full py-3 px-5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow-sm appearance-none border border-gray-300 rounded-full w-full py-3 px-5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-500">
            Already have an account?{' '}
            <a href="/login" className="text-purple-600 font-semibold hover:text-purple-700 transition duration-200">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
