import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { ref, deleteObject } from "firebase/storage";
import storage from "../firebase";
import axios from 'axios'

const RecipeContext = createContext({})

export const useRecipeContext = () => useContext(RecipeContext)

export const RecipeContextProvider = ({ children }) => {

    const foodid = "food-" + uuidv4().slice(0, 10);
    const navigate = useNavigate();

    const [loading, setLoading] = React.useState(false);

    const [food, setFood] = useState({
        foodId: foodid,
        userId: '',
        foodName: '',
        foodAuthor: '',
        classification: '',
        categories: '',
        difficulty: '',
        yields: 0,
        time: 0,
        rating: 0,
        user: 0,
        ingredients: [],
        steps: [],
        image: "",
        approved: false
    })

    // const [open, setOpen] = useState(false)
    // const handleOpen = () => setOpen(true)

    const [alert, setAlert] = React.useState(false);

    const handleClick = () => {
        setAlert(true);
    };

    const closeAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlert(false);
    };

    const [alert2, setAlert2] = React.useState(false);

    const handleClick2 = () => {
        setAlert2(true);
    };

    const closeAlert2 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlert2(false);
    };



    const [deleted, setDeleted] = useState(false);

    const handleDeleted = () => {
        setDeleted(true);
    };

    const closeDeleted = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlert(false);
    };


    // Post Data

    const [message, setMessage] = useState("")
    const [validate, setValidate] = useState("")

    const handleSubmit = (e, user, user_id) => {
        e.preventDefault();
        setLoading(true);

        if (food.userId === '') {
            setMessage('errorEmail')
            setValidate("error")
            setLoading(false)
        }
        else if (food.foodName === '') {
            setMessage('errorFoodName')
            setValidate("warning")
            setLoading(false)
        }

        else if (food.foodAuthor === '') {
            setMessage('errorFoodAuthor')
            setValidate("warning")
            setLoading(false)
        }

        else if (food.classification === '') {
            setMessage('errorClassification')
            setValidate("warning")
            setLoading(false)
        }

        else if (food.categories === '') {

            setMessage('errorCategories')
            setValidate("warning")
            setLoading(false)
        }

        else if (food.classification === 'main-dish' &&
            food.categories !== 'BBQ and Grilling' &&
            food.categories !== 'Casseroles' &&
            food.categories !== 'Meats' &&
            food.categories !== 'Pasta' &&
            food.categories !== 'Pizza' &&
            food.categories !== 'Rice and Beans' &&
            food.categories !== 'Salads' &&
            food.categories !== 'Soups and Stew' &&
            food.categories !== 'Stir-Fry' &&
            food.categories !== 'Other') {
            setMessage('errorCategories')
            setValidate("warning")
            setLoading(false)
        }

        else if (
            food.classification === 'dessert' &&
            food.categories !== 'Cakes' &&
            food.categories !== 'Cookies' &&
            food.categories !== 'Biscuits' &&
            food.categories !== 'Pastries' &&
            food.categories !== 'Candies' &&
            food.categories !== 'Custards and Puddings' &&
            food.categories !== 'Deep-Fried' &&
            food.categories !== 'Frozen' &&
            food.categories !== 'Gelatin' &&
            food.categories !== 'Fruit' &&
            food.categories !== 'Other') {
            setMessage('errorCategories')
            setValidate("warning")
            setLoading(false)
        }

        else if (
            food.classification === 'beverages' &&
            food.categories !== 'Alcoholic' &&
            food.categories !== 'Non Alcoholic' &&
            food.categories !== 'Other') {
            setMessage('errorCategories')
            setLoading(false)
            setValidate("warning")

        }

        else if (food.classification === 'appetizers' &&
            food.categories !== 'Cocktails' &&
            food.categories !== 'Canape' &&
            food.categories !== 'Relishes/Crudit' &&
            food.categories !== 'Salads' &&
            food.categories !== 'Soup & Consommé' &&
            food.categories !== 'Chips & Dips' &&
            food.categories !== 'Hors d’ oeuvres' &&
            food.categories !== 'Other') {
            setMessage('errorCategories')
            setValidate("warning")
            setLoading(false)

        }

        else if (food.difficulty === '') {
            setMessage('errorDifficulty')
            setValidate("warning")
            setLoading(false)
        }

        else if (food.time === 0) {
            setMessage('errorTime')
            setValidate("warning")
            setLoading(false)
        }

        else if (food.yields === 0) {
            setMessage('errorYields')
            setValidate("warning")
            setLoading(false)
        }

        else if (food.ingredients.length === 0 || food.ingredients.includes('')) {
            setMessage('errorIngredients')
            setValidate("warning")
            setLoading(false)
        }

        else if (food.steps.length === 0 || food.steps.includes('')) {
            setMessage('errorSteps')
            setValidate("warning")
            setLoading(false)
        }

        else if (food.image === '' || food.image === undefined) {
            setMessage('errorImage')
            setValidate("warning")
            setLoading(false)
        }

        else {
            try {
                const url = process.env.REACT_APP_API_URL + "/recipes";
                axios.post(url, food);
                setLoading(false)
                handleClick()
                navigate("/")

            }
            catch (error) {
                console.log(error.message)

            }
        }

    }

    // console.log = console.warn = console.error = () => {};
    
    // Fetch Data
    const [data, setData] = useState([]);

    const getAllData = async () => {
        setLoading(true)

        try {
            const { data } = await axios.get(process.env.REACT_APP_API_URL + "/recipes")
            setData(data.data)
            setTimeout(() => {
                setLoading(false)
            }, 5000)

        }
        catch (error) {
            setLoading(false)
        }

    }

    // Fetch User
    const [user, setUser] = useState([]);

    const getAllUser = async () => {
        setLoading(true)

        try {
            const { data } = await axios.get(process.env.REACT_APP_API_URL + `/user`)
            setUser(data.data)

            setTimeout(() => {
                setLoading(false)
            }, 2000)
        }

        catch (error) {
            setLoading(false)
        }

    }


    // Delete Data

    const deleteRecipe = async (id, food) => {

        setLoading(true)
        const foodImage = ref(
            storage,
            `${food.foodId}`

        )

        const url = process.env.REACT_APP_API_URL + `/recipes/${id}`
        try {
            const res = await axios.delete(url, id);
            deleteObject(foodImage)
                .then(() => {
                    console.log('Deleted')
                })
                .catch((error) => {
                    console.log(error)
                })
            console.log(res)
            setLoading(false);
            handleDeleted()
            navigate("/")
        }
        catch (err) {
            console.error(err);
            setLoading(false)
        }

        setTimeout(function () {
            window.location.reload();
        }, 2000);
    }

    // Update Data

    const handleUpdate = async (id, update) => {

        console.log(update)
        setLoading(true);

        if (update.userId === '') {
            setMessage('errorEmail')
            setValidate("error")
            setLoading(false)
        }
        else if (update.foodName === '') {
            setMessage('errorFoodName')
            setValidate("warning")
            setLoading(false)
        }

        else if (update.foodAuthor === '') {
            setMessage('errorFoodAuthor')
            setValidate("warning")
            setLoading(false)
        }

        else if (update.classification === '') {
            setMessage('errorClassification')
            setValidate("warning")
            setLoading(false)
        }

        else if (update.categories === '') {

            setMessage('errorCategories')
            setValidate("warning")
            setLoading(false)
        }

        else if (update.classification === 'main-dish' &&
            update.categories !== 'BBQ and Grilling' &&
            update.categories !== 'Casseroles' &&
            update.categories !== 'Meats' &&
            update.categories !== 'Pasta' &&
            update.categories !== 'Pizza' &&
            update.categories !== 'Rice and Beans' &&
            update.categories !== 'Salads' &&
            update.categories !== 'Soups and Stew' &&
            update.categories !== 'Stir-Fry' &&
            update.categories !== 'Other') {
            setMessage('errorCategories')
            setValidate("warning")
            setLoading(false)
        }

        else if (
            update.classification === 'dessert' &&
            update.categories !== 'Cakes' &&
            update.categories !== 'Cookies' &&
            update.categories !== 'Biscuits' &&
            update.categories !== 'Pastries' &&
            update.categories !== 'Candies' &&
            update.categories !== 'Custards and Puddings' &&
            update.categories !== 'Deep-Fried' &&
            update.categories !== 'Frozen' &&
            update.categories !== 'Gelatin' &&
            update.categories !== 'Fruit' &&
            update.categories !== 'Other') {
            setMessage('errorCategories')
            setValidate("warning")
            setLoading(false)
        }

        else if (
            update.classification === 'beverages' &&
            update.categories !== 'Alcoholic' &&
            update.categories !== 'Non Alcoholic' &&
            update.categories !== 'Other') {
            setMessage('errorCategories')
            setLoading(false)
            setValidate("warning")

        }

        else if (update.classification === 'appetizers' &&
            update.categories !== 'Cocktails' &&
            update.categories !== 'Canape' &&
            update.categories !== 'Relishes/Crudit' &&
            update.categories !== 'Salads' &&
            update.categories !== 'Soup & Consommé' &&
            update.categories !== 'Chips & Dips' &&
            update.categories !== 'Hors d’ oeuvres' &&
            update.categories !== 'Other') {
            setMessage('errorCategories')
            setValidate("warning")
            setLoading(false)

        }

        else if (update.difficulty === '') {
            setMessage('errorDifficulty')
            setValidate("warning")
            setLoading(false)
        }

        else if (update.time === 0) {
            setMessage('errorTime')
            setValidate("warning")
            setLoading(false)
        }

        else if (update.yields === 0) {
            setMessage('errorYields')
            setValidate("warning")
            setLoading(false)
        }

        else if (update.ingredients.length === 0 || update.ingredients.includes('')) {
            setMessage('errorIngredients')
            setValidate("warning")
            setLoading(false)
        }

        else if (update.steps.length === 0 || update.steps.includes('')) {
            setMessage('errorSteps')
            setValidate("warning")
            setLoading(false)
        }

        else if (update.image === '' || update.image === undefined) {
            setMessage('errorImage')
            setValidate("warning")
            setLoading(false)
        }

        else {
            try {
                console.log(food)
                const url = process.env.REACT_APP_API_URL + `/recipes/${id}`
                const { update: res } = await axios.put(url, update);
                console.log(res)
                setLoading(false)
                handleClick()
                navigate('/')

            }

            catch (error) {
                console.log(error)

            }
            setTimeout(function () {
                window.location.reload();
            }, 2000);
        }
    }


    const handleApproved = async (id, foodRequest) => {

        setLoading(true)
        foodRequest.approved = true

        try {

            const urlRecipe = process.env.REACT_APP_API_URL + `/recipes/${id}`
            const { approved: recipeRes } = await axios.put(urlRecipe, foodRequest);
            console.log(recipeRes)
            setLoading(false)
            navigate('/')
            handleClick()
        }
        catch (error) {
            console.log(error)
        }

        setTimeout(function () {
            window.location.reload();
        }, 2000);
    }

    // Rate
    const handleRate = async (id, rating, user, update, user_id, rate, single) => {

        setLoading(true)
        update.rating = rating;
        update.user = user;
        rate.push(id)

        try {

            const urlRecipe = process.env.REACT_APP_API_URL + `/recipes/${id}`
            await axios.put(urlRecipe, update);
            setLoading(false)

            try {
                const urlUser = process.env.REACT_APP_API_URL + `/user/${user_id}`
                await axios.put(urlUser, single);
                handleClick()
                setLoading(false)
            }

            catch (error) {
                console.log(error)

            }

        }

        catch (error) {
            console.log(error)

        }

        setTimeout(function () {
            window.location.reload();
        }, 2000);

    }


    // Saved 

    const handleSaved = async (id, user_id, save, single) => {

        setLoading(true)
        save.push(id)

        try {
            const urlUser = process.env.REACT_APP_API_URL + `/user/${user_id}`
            await axios.put(urlUser, single);
            handleClick2()
            setLoading(false)
        }

        catch (error) {
            console.log(error)
        }

        setTimeout(function () {
            window.location.reload();
        }, 2000);

    }



    useEffect(() => {
        getAllData()
        getAllUser()
    }, [])


    const contextValue = {
        handleSubmit, validate, message, setMessage,
        food, setFood, loading,

        // Snackbar 
        closeAlert, alert, closeDeleted, deleted, closeAlert2, alert2,

        // Data
        data,

        // Delete Data
        deleteRecipe,

        // Update Data
        handleUpdate, handleRate, handleSaved, handleApproved,

        // User
        user

    }

    return (
        <RecipeContext.Provider value={contextValue}>
            {children}
        </RecipeContext.Provider>

    )
}