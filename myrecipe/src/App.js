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

import './index.scss'

function App() {

  /* 
    Food ID - System Generated
    Food Name - String
    Food Author - String
    Classification - String
    Categories - String
    Difficulty - String
    Time - String
    Rating - Array ( Rating/Click )
    Ingredients - Array
        -> Ingredients
          -> Quantity
          -> Ingredients Name
    Steps - Array 
    Image - String URL

    Authentication - Email and Password

    Download and Create PDF 

    IP Detection
  */

    
  return (
    <>
      <ThemeProvider theme={theme}>
        <Responsive>
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/:classification/:id/:userId" element={<Cards />} />
            <Route path="/edit/:classification/:id/:userId" element={<EditCards />} />
            <Route path="/create" element={<CreateCards />} />
            <Route path="/myprofile/:userId" element={<MyProfile />} />
          </Routes>
        </Responsive>
      </ThemeProvider>
    </>
  );
}

export default App;
