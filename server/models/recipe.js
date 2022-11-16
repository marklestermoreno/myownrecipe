const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    foodId: { type: String, required: true },
    foodName: { type: String, required: true },
    foodAuthor: { type: String, required: true },
    classification: { type: String, required: true },
    categories: { type: String, required: true },
    difficulty: { type: String, required: true },
    time: { type: Number, required: true },
    rating: { type: Number, required: true },
    user: { type: Number, required: true },
    ingredients: { type: Array, required: true },
    steps: { type: Array, required: true },
    image: { type: String, required: true },
    userType: { type: String, required: false },
    approved: { type: Boolean, default: false },
}, { timestamps: true })

module.exports = mongoose.model("recipe", recipeSchema)