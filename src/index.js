import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import { RecipesProvider } from './Context/RecipeContext';
import './interceptors/axios'
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RecipesProvider>
    <App />
    </RecipesProvider>
  </React.StrictMode>
);

