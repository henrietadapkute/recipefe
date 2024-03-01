import { useEffect, useState } from "react";
import axios from "axios";
import RecipeView from "./RecipeView"
import CategoryNavigation from "./CategoryView";
import BookmarkedRecipes from "./Bookmarked";

const MainPage = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      window.location.href = "/login";
    } else {
      (async () => {
        try {
          const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/`, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
            },
          });
          setMessage(data.message);
        } catch (e) {
          console.log("not auth");
        }
      })();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="form-signin mt-5 text-center">
      <h3>{message}</h3>
      <div className="artboard phone-5.5 text-left">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold">Categories</h1>
          <button className="btn btn-outline bg-primary-content">
            <a href="/createrecipe">Create a Recipe</a>
          </button>
        </div>

        <CategoryNavigation />
        <br /><br />
        <RecipeView />

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-grow">
            <div className="recipe-view-container flex flex-wrap justify-start gap-4">
              <br />
              
            </div>
          </div>
        </div>
        <br />
        <BookmarkedRecipes />
      </div>
    </div>
  );
};

export default MainPage;