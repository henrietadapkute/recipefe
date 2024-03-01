import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecipes } from '../Context/RecipeContext';
import { useNavigate } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();
  const { getRecipeById, deleteRecipe, editRecipe } = useRecipes();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const fetchedRecipe = await getRecipeById(id);
        setRecipe(fetchedRecipe);
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      }
    };

    if (id) {
      fetchRecipe();
    }
  }, []);

  const handleDelete = () => {
    deleteRecipe(recipe.id);
  };

   const openEditPage = (recipeId) => {
    navigate(`/edit/${recipeId}`);
  };

  // Safeguard against null recipe
  if (!recipe) {
    return <div>Loading recipe details...</div>;
  }

  return (
    <div className="card card-compact w-full max-w-4xl bg-base-100 shadow-xl gap-4">
      {/* {recipe.image && ( */}
        <figure>
          <img src={recipe.image} alt={recipe.title} />
        </figure>
      {/* )} */}
      <div className="card-body">
        <h2 className="card-title">{recipe.title}</h2>
        <p>Category: {recipe.category?.name || 'Uncategorized'}</p>
        <p>Description: {recipe.description}</p>
        <p>Preparation Time: {recipe.prep_time} minutes</p>
        <p>Cooking Time: {recipe.cook_time} minutes</p>
        <p>Servings: {recipe.servings}</p>
        <p>Instructions: {recipe.instructions}</p>
        <div className="card-actions justify-end">
          <button onClick={() => openEditPage(recipe.id)} className="btn btn-primary">Edit Recipe</button>
          <button onClick={handleDelete} className="btn btn-error">Delete Recipe</button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
