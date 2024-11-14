import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/cars`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
          },
        });
        setProducts(data);
        setFilteredProducts(data); // Initialize filteredProducts with all products
      } catch (err) {
        setError('Failed to load products. Please try again.');
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  // Function to handle the search input
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter products based on search query (search in title, description, or tags)
    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.tags.some((tag) => tag.toLowerCase().includes(query))
    );

    setFilteredProducts(filtered); // Update filtered products based on the query
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-teal-400 to-blue-500 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center text-white mb-10">My Cars</h1>

        {error && <p className="text-red-600 text-center font-semibold mb-4">{error}</p>}

        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search for a car by title, description, or tags..."
            className="p-3 w-1/2 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.length === 0 ? (
            <p className="text-white text-center text-xl">No products found.</p>
          ) : (
            filteredProducts.map((product) => (
              <Link to={`/product/${product._id}`} key={product._id} className="transform hover:scale-105 transition-transform duration-300">
                <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <div className="overflow-hidden rounded-xl mb-4">
                    <img
                      src={product.images[0] ? `http://localhost:5000/${product.images[0]}` : 'https://via.placeholder.com/300'}
                      alt={product.title}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.title}</h2>
                  <p className="text-gray-600 text-sm">{product.description.substring(0, 80)}...</p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
