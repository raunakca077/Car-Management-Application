import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductCreate = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tags', tags);
    images.forEach((image) => formData.append('images', image));

    try {
      setError('');
      await axios.post(`https://car-management-application-nhas.onrender.com/api/cars`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/products');
    } catch (error) {
      setError('Failed to create product. Please try again.');
      console.error(error);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-400 via-red-400 to-yellow-500">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-2xl transform transition duration-500 hover:shadow-2xl">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-red-600">Create New Product</h2>

        {error && <p className="text-red-600 text-center font-semibold mb-4">{error}</p>}

        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              placeholder="Product title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow-sm appearance-none border border-gray-300 rounded-full w-full py-3 px-5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow-sm appearance-none border border-gray-300 rounded-2xl w-full py-3 px-5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="tags">Tags</label>
            <input
              type="text"
              id="tags"
              placeholder="Tags (comma separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="shadow-sm appearance-none border border-gray-300 rounded-full w-full py-3 px-5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="images">Upload Images</label>
            <input
              type="file"
              id="images"
              multiple
              onChange={handleImageChange}
              className="block w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100 transition duration-300"
            />
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            {previewImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Preview"
                className="w-24 h-24 object-cover rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105"
              />
            ))}
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductCreate;
