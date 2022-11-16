import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import { RecipeContextProvider } from './context/recipeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <React.StrictMode>
      <RecipeContextProvider>
        <App />
      </RecipeContextProvider>
    </React.StrictMode>
  </Router>
);

