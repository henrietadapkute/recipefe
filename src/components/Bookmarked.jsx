import React, { useEffect, useState } from 'react';
import { useRecipes } from '../Context/RecipeContext';
import { useNavigate } from 'react-router-dom';

const BookmarkedRecipes = () => {
  const { recipes } = useRecipes();
  
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarkedRecipes')) || {};
    const filteredRecipes = recipes.filter(recipe => savedBookmarks[recipe.id]);

    setBookmarkedRecipes(filteredRecipes);
     // eslint-disable-next-line
  }, [recipes]);

   const openDetails = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-left my-6">Bookmarked Recipes</h2>
      <div className="recipes-container" style={{ display: 'flex', background: 'lightblue', padding: '20px', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
        {bookmarkedRecipes.length > 0 ? bookmarkedRecipes.map((recipe) => (
          <div key={recipe.id} className="card card-compact w-80 bg-base-100 shadow-xl m-2">
            <figure className="px-10 pt-10">
              <img src='https://recipeland.com/images/v2/placeholders/recipe-18-19.jpg' alt={recipe.title} className="rounded-l" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title" onClick={() => openDetails(recipe.id)}>{recipe.title}</h2>
              <p>Category: <span className="badge badge-warning">{recipe.category_name}</span></p>
              <p>Description: {recipe.description}</p>
            </div>
          </div>
        )) : (
          <p className="text-center">You have no bookmarked recipes.</p>
        )}
      </div>
    </div>
  );
};

export default BookmarkedRecipes;
