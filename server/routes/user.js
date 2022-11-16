
const router = require("express").Router();
const User = require("../models/user")

// Create User

router.post("/", async (req, res, next) => {
    try {
        const user = await User(req.body).save();
        res.status(201).send({ data: user, message: "User Created Successfully" })
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" })
    }
})

// Update User 

router.put("/:id", async (req, res) => {

    try {
        const updateRecipe = await User.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true })
        res.status(201).json(updateRecipe)
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" })
    }

})


// Get Specific User using Email
router.get("/:email", async (req, res) => {

    User.find({ "email": req.params.email })
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));

})

// Get Specific User using userId
router.get("/userId/:userId", async (req, res) => {

    User.find({ "userId": req.params.userId })
        .then(user => res.json(user))
        .catch(err => res.status(500).json('Error: ' + err));

})

// Get All User 
router.get("/", async (req, res, next) => {

    try {
        const user = await User.find();
        res.status(200).send({ data: user })
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" })
    }
})

module.exports = router;

