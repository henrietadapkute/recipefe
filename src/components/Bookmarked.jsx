import React, { useEffect, useState } from 'react';
import { useRecipes } from '../Context/RecipeContext';

const BookmarkedRecipes = () => {
  const { recipes } = useRecipes();
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState([]);

  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarkedRecipes')) || {};
    const filteredRecipes = recipes.filter(recipe => savedBookmarks[recipe.id]);

    setBookmarkedRecipes(filteredRecipes);
  }, [recipes]);

  return (
    <div>
      <h2 className="text-3xl font-bold text-center my-6">Bookmarked Recipes</h2>
      <div className="recipes-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
        {bookmarkedRecipes.length > 0 ? bookmarkedRecipes.map((recipe) => (
          <div key={recipe.id} className="card card-compact w-80 bg-base-100 shadow-xl m-2">
            <figure className="px-10 pt-10">
              <img src={recipe.image || 'path/to/default/image.png'} alt={recipe.title} className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{recipe.title}</h2>
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
