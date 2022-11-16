
require('dotenv').config();
const express = require('express');
const app = express();

const connection = require('./db')
const cors = require('cors')
const recipeRoutes = require("./routes/recipe")
const userRouters = require("./routes/user")


// Database Connection
connection()

// Middlewares
app.use(express.json())
app.use(cors())

// Routes
app.use("/api/recipes", recipeRoutes)
app.use("/api/user", userRouters)


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}... `))

