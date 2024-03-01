
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Mainmenu from "./components/Menu";
import Logout from "./components/Logout";
import MainPage from "./components/MainPage";
import CreateRecipeForm from "./components/CreateRecipe";
import RecipeSearch from "./components/SearchRecipeView";
import RecipeDetail from "./components/RecipeDetailView";
import EditRecipe from "./components/EditRecipe";
import BookmarkedRecipes from "./components/Bookmarked";
import { Container } from "react-bootstrap";

function App() {
  return (
    <BrowserRouter>
      <Mainmenu />
      <Container className="mt-5">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/search" element={<RecipeSearch />} />
          <Route path="/createrecipe" element={<CreateRecipeForm />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/edit/:recipeId" element={<EditRecipe />} />
          <Route path="/bookmarked" element={<BookmarkedRecipes />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
