import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecipes } from '../Context/RecipeContext';
import { useNavigate } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();
  const { getRecipeById, deleteRecipe} = useRecipes();
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
      // eslint-disable-next-line
    };

    if (id) {
      fetchRecipe();
    }
    // eslint-disable-next-line
  }, []);

  const handleDelete = () => {
    deleteRecipe(recipe.id);
  };

   const openEditPage = (recipeId) => {
    navigate(`/edit/${recipeId}`);
  };

  if (!recipe) {
    return <div><div className="flex flex-col gap-4 w-52">
  <div className="skeleton h-32 w-full"></div>
  <div className="skeleton h-4 w-28"></div>
  <div className="skeleton h-4 w-full"></div>
  <div className="skeleton h-4 w-full"></div>
</div></div>;
  }

  return (
    <div className="card card-compact w-full max-w-4xl bg-base-100 shadow-xl gap-4">
      <figure style={{ paddingTop: '20px' }}>
  <img
    src='https://recipeland.com/images/v2/placeholders/recipe-18-19.jpg'
    alt={recipe.title}
    style={{ width: '200px', height: '200px' }} 
    className="rounded-s"
  />
</figure>
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
