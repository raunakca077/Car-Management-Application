import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-6">
      <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-4xl w-full">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Car Management</h2>
        
        <div className="flex justify-evenly mb-10">
          <Link
            to="/product/create"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105"
          >
            Add New Car
          </Link>
          <Link
            to="/products"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105"
          >
            View My Cars
          </Link>
        </div>

        <div className="text-center mt-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Welcome to your dashboard!</h3>
          <p className="text-gray-600 text-lg">
            Here you can manage your cars, add new ones, and view details of existing cars in one place.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
