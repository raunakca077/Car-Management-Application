import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setError('');
      const { data } = await axios.post(`https://car-management-application-nhas.onrender.com/api/users/login`, { email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/dashboard');  // Replaces history.push
    } catch (error) {
      setError('Invalid email or password');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600">
      <div className="bg-white p-10 rounded-lg shadow-2xl w-full max-w-md transform transition-all hover:scale-105 duration-300">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={submitHandler}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
            />
          </div>
          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105 duration-200"
            >
              Login
            </button>
          </div>
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don’t have an account?{' '}
              <a href="/signup" className="text-indigo-500 hover:text-indigo-700 transition duration-150">
                Sign Up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
