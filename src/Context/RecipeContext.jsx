import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const RecipesContext = createContext();

export const useRecipes = () => useContext(RecipesContext);

export const RecipesProvider = ({ children }) => {
    const [recipes, setRecipes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);

    useEffect(() => {
        fetchInitialData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchInitialData = async () => {
        getRecipes();
        getCategories();
    };

    const getRecipes = async (category = null) => {
    const token = localStorage.getItem('access_token');
    let url = `${API_URL}/recipes/`;

    if (category) {
        url += `?category=${category}/`;
    }

    try {
        if (token) {
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setRecipes(response.data);
        }
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
};


    const getCategories = async () => {
        try {
            const response = await axios.get(`${API_URL}/categories/`);
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

   const fetchRecipesByCategory = async (categoryId) => {
    try {
        const token = localStorage.getItem('access_token');
        const url = `${API_URL}/recipes/?category=${categoryId}`;
        
        const config = token ? {
            headers: { 'Authorization': `Bearer ${token}` }
        } : {};

        const response = await axios.get(url, config);
        setRecipes(response.data)
    } catch (error) {
        console.error('Error fetching recipes by category:', error);
    }
};


   
    const addRecipe = async (newRecipe) => {
        
        try {
            const token = localStorage.getItem('access_token');
            const decoded = jwtDecode(token);
            const userId = decoded.user_id;

            newRecipe.user = userId;

            if (token) {
                const response = await axios.post(`${API_URL}/recipes/`, newRecipe, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                setRecipes([...recipes, response.data]);
            }
        } catch (error) {
            console.error('Error adding recipe:', error);
        }
    };

    const deleteRecipe = async (recipeId) => {
        const token = localStorage.getItem('access_token');
        try {
            if (token) {
                await axios.delete(`${API_URL}/recipes/${recipeId}/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                setRecipes(prev => prev.filter(recipe => recipe.id !== recipeId));
            }
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    const editRecipe = async (recipeId, updatedRecipe) => {
        const token = localStorage.getItem('access_token');
        try {
            if (token) {
                const response = await axios.patch(`${API_URL}/recipes/${recipeId}/`, updatedRecipe, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                setRecipes(prev => prev.map(recipe => recipe.id === recipeId ? response.data : recipe));
            }
        } catch (error) {
            console.error('Error updating recipe:', error);
        }
    };

    const getRecipeById = async (id) => {
  const token = localStorage.getItem('access_token');
  const response = await axios.get(`${API_URL}/recipes/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'

    },
  });
  return response.data;
};


    return (
      <RecipesContext.Provider
        value={{
          recipes,
          categories,
          getRecipes,
          addRecipe,
          deleteRecipe,
          editRecipe,
          setActiveCategory,
          activeCategory,
          fetchRecipesByCategory,
          getRecipeById,
        }}
      >
        {children}
      </RecipesContext.Provider>
    );
};
