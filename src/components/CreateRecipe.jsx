import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function CreateRecipeForm() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '', 
    description: '',
    prep_time: null,
    cook_time: null,
    servings: null,
    instructions: '',
  });

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await axios.get(`${API_URL}/categories/`);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [API_URL]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = name === 'cook_time' || name === 'prep_time' || name === 'servings' || name === 'category' ? parseInt(value, 10) : value;

    setFormData(prevState => ({
      ...prevState,
      [name]: processedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('No access token found');
      return; 
    }

    const decoded = jwtDecode(token);
    const userId = decoded.user_id;

    const recipeData = {
      ...formData,
      user: userId,
    };

    try {
      await axios.post(`${API_URL}/recipes/`, recipeData, {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});
console.log('Recipe created successfully');
navigate('/');
  
      setFormData({
        title: '',
        category: '', 
        description: '',
        prep_time: null,
        cook_time: null,
        servings: null,
        instructions: '',
      });
      console.log('Recipe created successfully');
   
    } catch (error) {
      console.error('Error creating recipe', error.response ? error.response.data : error);
    }
  };

  return (
    <div className="card large shadow-lg p-5 bg-white rounded-lg">
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className="input input-bordered w-full mb-4"
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="select select-bordered w-full mb-4"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="textarea textarea-info w-full mb-4"
        />
        <input
          name="prep_time"
          type="number"
          className="input input-bordered w-full mb-4"
          value={formData.prep_time}
          onChange={handleChange}
          placeholder="Prep Time (min)"
          required
        />
        <input
          name="cook_time"
          type="number"
          className="input input-bordered w-full mb-4"
          value={formData.cook_time}
          onChange={handleChange}
          placeholder="Cook Time (min)"
          required
        />
        <input
          name="servings"
          type="number"
          className="input input-bordered w-full mb-4"
          value={formData.servings}
          onChange={handleChange}
          placeholder="Servings"
          required
        />
        <textarea
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          placeholder="Cooking Instructions"
          required
          className="textarea textarea-info w-full mb-4"
        />
        <button type="submit" className="btn btn-primary">Create Recipe</button>
      </form>
    </div>
  );
}

export default CreateRecipeForm;
