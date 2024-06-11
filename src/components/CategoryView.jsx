import { useRecipes } from "../Context/RecipeContext";
export default function CategoryNavigation() {
  const { fetchRecipesByCategory, categories } = useRecipes();

  return (
    <div>
      <ul className="menu menu-horizontal bg-base-200 p-0">
        { categories ?  
        categories.map((category) => (
          <li key={category.id}  className="menu-item" onClick={() => fetchRecipesByCategory(category.name)}>
              <button
          onClick={(e) => {
            e.preventDefault(); 
            fetchRecipesByCategory(category.name);
          }}
          className="text-lg text-gray-700 hover:text-gray-900"
        >
          {category.name}
        </button>
          </li>
        )) : <div className="flex justify-center items-center flex-wrap gap-8">
        <div className="flex flex-col gap-4 w-52">
       
        </div>
        <div className="flex flex-col gap-4 w-52">
      
        </div>
        <div className="flex flex-col gap-4 w-52">
         
        </div>
      </div> }
      </ul>
    </div>
  );
}
