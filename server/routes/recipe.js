
const router = require("express").Router();
const Recipe = require('../models/recipe');

// Create Recipe 

router.post("/", async (req, res) => {
    try {
        const recipe = await Recipe(req.body).save();
        res.status(201).send({ data: recipe, message: "Recipe Created Successfully" })
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" })
    }
})

// Update Recipe 

router.put("/:id", async (req, res) => {
    try {
        const updateRecipe = await Recipe.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true})
        res.status(201).json(updateRecipe)
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" })
    }
}) 


// Delete Recipe

router.delete("/:id", async (req, res) => {
    try {
        await Recipe.findByIdAndDelete(req.params.id)
        res.status(201).json("Recipe has been deleted")
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" })
    }
}) 

// Get Recipe

router.get("/:id", async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id)
        res.status(201).json(recipe)
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" })
    }
}) 


// Get All Recipe
router.get("/", async (req, res, next) => {

    try {
        const recipe = await Recipe.find();
        res.status(200).send({data: recipe})
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" })
    }
})


module.exports = router;