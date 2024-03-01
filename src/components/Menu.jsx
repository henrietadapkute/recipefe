import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import RecipeSearch from "./SearchRecipeView";
import { useNavigate } from 'react-router-dom';

export default function Mainmenu() {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    setIsAuth(localStorage.getItem("access_token") !== null);
    // eslint-disable-next-line
  }, []);


const handleSubmit = (event) => {
  navigate(`/search`); 
};
  return (
    <div className="navbar bg-primary-content relative z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            {isAuth ? (
              <>
                <li><a href="/">Homepage</a></li>
                <li><a href="/createrecipe">Create a Recipe</a></li>
                <li><a href="/search">Browse Recipes</a></li>
                <li><a href="/logout">Logout</a></li>
              </>
            ) : (
              <>
                <li><a href="/login">Login</a></li>
                <li><a href="/signup">SignUp</a></li>
              </>
            )}
          </ul>
        </div>
      </div>
      <div className="navbar-left">
        <a className="btn btn-ghost text-xl" href="/">Co.okBook</a>
      </div>
      <div className="navbar-middle">
<div className="navbar-middle flex items-center">
    <button aria-label="Search" onClick={handleSubmit} className="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    </button>

    <button className="btn btn-ghost btn-circle">
        <div className="indicator">
            <Link to="/bookmarked">
                <Bookmark className="h-5 w-5" />
                <span className="badge badge-xs badge-primary indicator-item"></span>
            </Link>
        </div>
    </button>
</div>
        <div className="avatar">
            <button className="btn btn-ghost btn-circle">
              
  <div className="w-10 rounded-full">
  <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="Profile avatar" />
</div>
</button></div>

      </div>
    </div>
    
  );
}
