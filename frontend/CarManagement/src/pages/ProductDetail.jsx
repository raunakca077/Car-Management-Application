import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate

const ProductDetail = () => {
  const { id } = useParams(); // Get the `id` parameter using useParams
  const [product, setProduct] = useState({});
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false); // State to toggle form visibility
  const [updatedProduct, setUpdatedProduct] = useState({
    title: '',
    description: '',
    tags: '',
    images: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`https://car-management-application-nhas.onrender.com/api/cars/${id}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
          },
        });
        setProduct(data);
        setUpdatedProduct(data); // Pre-fill form with current product data
      } catch (err) {
        setError('Failed to load product details. Please try again.');
        console.error(err);
      }
    };
    fetchProduct();
  }, [id]); // Re-run when the `id` changes

  const deleteProduct = async () => {
    try {
      await axios.delete(`https://car-management-application-nhas.onrender.com/api/cars/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
        },
      });
      navigate('/products');
    } catch (err) {
      setError('Failed to delete product. Please try again.');
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({ ...updatedProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    setUpdatedProduct({ ...updatedProduct, images: e.target.files });
  };

  const updateProduct = async () => {
    try {
      // Create a new FormData instance to append data and files
      const formData = new FormData();
      formData.append('title', updatedProduct.title);
      formData.append('description', updatedProduct.description);
      formData.append('tags', updatedProduct.tags);

      // Append images to FormData, assuming updatedProduct.images contains file objects
      if (updatedProduct.images.length > 0) {
        Array.from(updatedProduct.images).forEach((image) => {
          formData.append('images', image); // Ensure this is a file object
        });
      }

      const { data } = await axios.put(`https://car-management-application-nhas.onrender.com/api/cars/${id}`, formData, {
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
          'Content-Type': 'multipart/form-data', // Important for file upload
        },
      });

      // Navigate back to the product detail page after successful update
      navigate(`/products`);
    } catch (err) {
      setError('Failed to update product. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-3xl w-full transform transition duration-500 hover:shadow-3xl">
        {error && <p className="text-red-600 text-center font-semibold mb-4">{error}</p>}
        
        {!isEditing ? (
          <>
            <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">{product.title}</h1>
            <p className="text-gray-700 text-lg mb-6 text-center">{product.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.images && product.images.map((image, index) => (
                <div key={index} className="overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transform transition duration-300 hover:scale-105">
                  <img
                    src={`https://car-management-application-nhas.onrender.com/${image}`}  // Ensure the full URL is used
                    alt={product.title}
                    className="w-full h-64 object-cover"
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Update Product</h1>
            <form onSubmit={(e) => { e.preventDefault(); updateProduct(); }}>

              <div className="mb-4">
                <label className="block text-lg font-medium mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={updatedProduct.title}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              <div className="mb-4">
                <label className="block text-lg font-medium mb-2">Description</label>
                <input
                  type="text"
                  name="description"
                  value={updatedProduct.description}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              <div className="mb-4">
                <label className="block text-lg font-medium mb-2">Tags</label>
                <input
                  type="text"
                  name="tags"
                  value={updatedProduct.tags}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              <div className="mb-4">
                <label className="block text-lg font-medium mb-2">Images</label>
                <input
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              <div className="mt-4 text-center">
              <button
                  type="button" // Use "button" instead of "submit" because we're not submitting a form directly
                  className="bg-green-600 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:bg-green-700 transition duration-300 transform hover:-translate-y-1"
                  onClick={async () => {
                    await updateProduct(); // Call the updateProduct function
                    setIsEditing(false); // Hide the editing form once the product is updated
                  }}
                >
                  Update Product
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="mt-8 text-center">
          <button
            className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:-translate-y-1 mr-4"
            onClick={() => window.history.back()}
          >
            Back
          </button>
          <button
            className="bg-red-600 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:bg-red-700 transition duration-300 transform hover:-translate-y-1 mr-4"
            onClick={deleteProduct}
          >
            Delete
          </button>
          <button
            className="bg-green-600 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:bg-green-700 transition duration-300 transform hover:-translate-y-1"
            onClick={() => setIsEditing(true)} // Show the form to update product
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
