import { Bookmark } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRecipes } from '../Context/RecipeContext';
import { useNavigate } from 'react-router-dom';

export default function RecipeView() {
  const { recipes, getRecipes} = useRecipes();
  const [bookmarked, setBookmarked] = useState({});
  // const [favourite, setFavourite] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
  const savedBookmarks = JSON.parse(localStorage.getItem('bookmarkedRecipes'));
  if (savedBookmarks) {
    setBookmarked(savedBookmarks);
  }
  getRecipes();
  // eslint-disable-next-line
}, []);

  const toggleBookmark = recipeId => {
  setBookmarked(prev => {
    const updated = { ...prev, [recipeId]: !prev[recipeId] };
    localStorage.setItem('bookmarkedRecipes', JSON.stringify(updated)); 
    return updated;
  });
};

  // const toggleFavourite = recipeId => {
  //   setFavourite(prev => ({ ...prev, [recipeId]: !prev[recipeId] }));
  // };

  const openDetails = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };
 console.log(recipes)
  if (!recipes || recipes.length === 0) {
  return (
    <div className="flex justify-center items-center flex-wrap gap-8">
      <div className="flex flex-col gap-4 w-52">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
      <div className="flex flex-col gap-4 w-52">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
      <div className="flex flex-col gap-4 w-52">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    </div>
  );
}


  return (
    <div className="recipes-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
      {recipes.map((recipe) => (
    <div key={recipe.id} className="card card-compact w-80 bg-base-100 shadow-xl m-2">
        <figure className="px-10 pt-10">
            <img src='https://recipeland.com/images/v2/placeholders/recipe-18-19.jpg' alt={recipe.title} className="rounded-l" />
        </figure>
        <div className="card-body">
            <h2 className="card-title" onClick={() => openDetails(recipe.id)}>{recipe.title}</h2>
            <p>Category: <span className="badge badge-warning">{recipe.category_name}</span></p>
            <p>{recipe.description}</p>
            <div className="card-actions justify-end">
              <button onClick={() => toggleBookmark(recipe.id)} className="p-2 rounded-full hover:bg-gray-200">
                <Bookmark color={bookmarked[recipe.id] ? 'red' : 'black'} />
              </button>
              {/* <button onClick={() => toggleFavourite(recipe.id)} className="p-2 rounded-full hover:bg-gray-200">
                <Heart color={favourite[recipe.id] ? 'red' : 'black'} />
              </button> */}
              
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

