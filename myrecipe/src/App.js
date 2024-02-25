import React from "react";

import { Routes, Route } from 'react-router-dom'
import Home from './Home/Home.jsx'
import Cards from './Cards/Cards.jsx'
import CreateCards from "./CRUD/CreateCards.jsx";
import EditCards from "./CRUD/EditCards.jsx";
import MyProfile from "./MyProfile/MyProfile.jsx";

import { theme } from "./responsive.js";
import { Responsive } from './Home/home.js'
import { ThemeProvider } from "@mui/material";

import { useRecipeContext } from './context/recipeContext';
// import { ClipLoader } from "react-spinners";

import LoadingAnimation from "./assets/Loading.gif"

import './index.scss'

function App() {

  const { loading } = useRecipeContext()

  return (
    <>
      <ThemeProvider theme={theme}>
        <Responsive>
          { loading ?
            <div className="loader">
              {/* <ClipLoader color="#01937c" size="70" /> */}
              <img src={LoadingAnimation} alt="loading-animation" className="loading-gif" />
              <h4 className="text-loading"> <b> Tips: </b> Make sure to login to create, share and save recipes</h4>
            </div>
            :
            <Routes>
              <Route path="/*" element={<Home />} />
              <Route path="/:classification/:id/:userId" element={<Cards />} />
              <Route path="/edit/:classification/:id/:userId" element={<EditCards />} />
              <Route path="/create" element={<CreateCards />} />
              <Route path="/myprofile/:userId" element={<MyProfile />} />
            </Routes>
          }
        </Responsive>
      </ThemeProvider>
    </>
  );
}

export default App;
