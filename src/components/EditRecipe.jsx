import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecipes } from '../Context/RecipeContext';

function EditRecipe() {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const { getRecipeById, editRecipe } = useRecipes();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [servingSize, setServingSize] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchRecipe = async () => {
      const recipe = await getRecipeById(recipeId);
      if (recipe) {
        setTitle(recipe.title);
        setDescription(recipe.description);
        setInstructions(recipe.instructions);
        setPrepTime(recipe.prepTime);
        setCookTime(recipe.cookTime);
        setServingSize(recipe.servingSize);
        setCategory(recipe.category);
        setImageUrl(recipe.imageUrl);
      }
    };

    fetchRecipe();
  }, [recipeId, getRecipeById]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedRecipe = {
      title,
      description,
      instructions,
      prepTime,
      cookTime,
      servingSize,
      category,
      imageUrl
    };
    await editRecipe(recipeId, updatedRecipe);
    navigate('/');
  };

  return (
    <div className="edit-recipe-page p-4 flex justify-center items-center min-h-screen">
      <div className="card bg-base-100 shadow-xl w-full max-w-4xl">
         <div className="card-body text-center">
          <h2 className="card-title ">Edit Recipe</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 place-items-center">
          
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />

        <textarea
          className="textarea textarea-bordered w-full max-w-xs"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        /> 

        <textarea
              className="input input-bordered w-full max-w-xs"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Instructions"
            ></textarea>

        <input
          type="text"
          className="input input-bordered w-100 max-w-xs"
          value={prepTime}
          onChange={(e) => setPrepTime(e.target.value)}
          placeholder="Preparation Time"
        />

        <input
          type="text"
          className="input input-bordered w-full max-w-xs"
          value={cookTime}
          onChange={(e) => setCookTime(e.target.value)}
          placeholder="Cooking Time"
        />

        <input
          type="number"
          className="input input-bordered w-full max-w-xs"
          value={servingSize}
          onChange={(e) => setServingSize(e.target.value)}
          placeholder="Serving Size"
        />

        <input
          type="text"
          className="input input-bordered w-full max-w-xs"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
        />

        <input
          type="text"
          className="input input-bordered w-full max-w-xs"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Image URL"
        />
         <div className="card-actions justify-end">
              <button type="submit" className="btn btn-primary">Save</button>
              <button type="button" className="btn btn-outline" onClick={() => navigate('/')}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditRecipe;
