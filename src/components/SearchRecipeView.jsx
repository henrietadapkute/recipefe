import React, { useEffect, useState } from 'react';
import { Bookmark, Heart } from 'lucide-react';

export default function RecipeSearch() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [bookmarked, setBookmarked] = useState({});
  const [favourite, setFavourite] = useState({});
  const [expandedRecipeUri, setExpandedRecipeUri] = useState(null);

  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarkedRecipes')) || {};
    const savedFavourites = JSON.parse(localStorage.getItem('favouriteRecipes')) || {};
    setBookmarked(savedBookmarks);
    setFavourite(savedFavourites);
    // eslint-disable-next-line
  }, []);


  const toggleBookmark = (recipeUri) => {
    setBookmarked((prev) => {
      const updated = { ...prev, [recipeUri]: !prev[recipeUri] };
      localStorage.setItem('bookmarkedRecipes', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleFavourite = (recipeUri) => {
    setFavourite((prev) => {
      const updated = { ...prev, [recipeUri]: !prev[recipeUri] };
      localStorage.setItem('favouriteRecipes', JSON.stringify(updated));
      return updated;
    });
  };


  const handleSearch = async (event) => {
    event.preventDefault();
    const appId = '95934e62'; 
    const appKey = 'df9168b86ed615ad18ddaf051618812a'; 
    const url = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}&from=0&to=10`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setRecipes(data.hits || []);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };


  const handleRecipeClick = (recipeUri) => {
    setExpandedRecipeUri(expandedRecipeUri === recipeUri ? null : recipeUri);
  };

  return (
    <>
      <h1 className="text-center font-bold text-xl mb-4">Browse Recipes</h1>
      <div className="card card-compact bg-base-100 shadow-xl mx-auto mb-6" style={{ maxWidth: '640px' }}>
        <div className="card-body">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <input
              type="text"
              className="input input-bordered flex-grow"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter a food (e.g., chicken)"
            />
            <button type="submit" className="btn btn-outline btn-error">Search</button>
          </form>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {recipes.map(({ recipe }) => {
          const isExpanded = recipe.uri === expandedRecipeUri;
          const isBookmarked = !!bookmarked[recipe.uri];
          const isFavourite = !!favourite[recipe.uri];

          return (
            <div key={recipe.uri} className="card card-compact w-60 bg-base-100 shadow-xl" onClick={() => handleRecipeClick(recipe.uri)}>
              <figure><img src={recipe.image} alt={recipe.label} /></figure>
              <div className="card-body">
                <h2 className="card-title">{recipe.label}</h2>
                <p>Source: {recipe.source}</p>
                <a href={recipe.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">View Full Recipe</a>
                
                {isExpanded && (
                  <div className="mt-4">
                    <p>Calories: {Math.round(recipe.calories)}</p>
                    <p>Servings: {recipe.yield}</p>
                    <p>Ingredients:</p>
                    <ul>
                      {recipe.ingredients.map((ingredient, idx) => (
                        <li key={idx}>{ingredient.text}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="card-actions justify-end">
                  <button onClick={(e) => { e.stopPropagation(); toggleBookmark(recipe.uri); }} className="p-2 rounded-full hover:bg-gray-200">
                    <Bookmark color={isBookmarked ? 'red' : 'black'} />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); toggleFavourite(recipe.uri); }} className="p-2 rounded-full hover:bg-gray-200">
                    <Heart color={isFavourite ? 'red' : 'black'} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
