import React, { useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import {
    Box, TextField, ThemeProvider, Grid, Button, Paper, TextareaAutosize, Stack,
    RadioGroup, Radio, FormControlLabel, Select, MenuItem, FormLabel, Typography
} from '@mui/material';

import MuiAlert from '@mui/material/Alert';

// Images and Icons
import SendIcon from '@mui/icons-material/Send';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import logo from '../assets/logo.png'

import './create.scss'
import '../Home/Home.scss'
import FileInput from '../FileInput/FileInput';

// Recipe Context
import { useRecipeContext } from '../context/recipeContext'

// Responsiveness
import { theme } from "../responsive.js";
import { Responsive } from '../Home/home'

import { motion } from 'framer-motion'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const CreateCards = () => {

    const navigate = useNavigate()
    const userInfo = JSON.parse(localStorage.getItem('user'));
    

    const { handleSubmit, message, setMessage, user, food, setFood, loading } = useRecipeContext()

    const handleChange = (e) => {
        setFood({ ...food, categories: e.target.value })
    };

    useEffect(() => {
        setFood({ ...food, userId: userInfo?.googleId });
        // eslint-disable-next-line
    }, [])

    // Handle Steps

    const handleSteps = (e, i) => {
        const stepsClone = [...food.steps]
        stepsClone[i] = e.target.value
        setFood({
            ...food,
            steps: stepsClone
        })
    }

    const handleStepsCount = () => {
        setFood({
            ...food,
            steps: [...food.steps, ""]
        })

    }

    const deleteSteps = i => {
        const deleteList = [...food.steps]
        deleteList.pop(i, 1)
        setFood({
            ...food,
            steps: deleteList
        })
    }


    // Handle Ingredients

    const handleIngredients = (e, i) => {
        const stepsClone = [...food.ingredients]
        stepsClone[i] = e.target.value
        setFood({
            ...food,
            ingredients: stepsClone
        })
    }


    const handleIngredientsCount = () => {
        setFood({
            ...food,
            ingredients: [...food.ingredients, ""]
        })

    }

    const removeIngredients = i => {
        food.ingredients.pop(i, 1);
        setFood({
            ...food, ingredients: food.ingredients
        })
    }

    // Handle Input

    const handleInputState = (value) => {
        setFood((prev) => ({ ...prev, image: value }))
    }

    return (
        <>
            {userInfo !== null ?
                <ThemeProvider theme={theme}>
                    <Responsive>
                        {
                            user.map((a) =>
                                a.userId === userInfo.googleId ?
                                    <Box sx={{
                                        display: {
                                            up: 'flex'
                                        },
                                        justifyContent: {
                                            up: 'center'
                                        },
                                        alignItems: {
                                            up: 'center'
                                        },
                                        textalign: {
                                            up: 'center'
                                        }

                                    }}>
                                        <Box>
                                            <Box className='header'
                                                sx={{
                                                    flexDirection: {
                                                        small: 'column'
                                                    },

                                                    margin: {
                                                        small: '20px 40px',
                                                        tablet: '40px 100px'
                                                    }

                                                }}>
                                                <motion.div animate={{ y: 0 }} initial={{ y: -1000 }} transition={{ duration: 0.75 }}>
                                                    <Link to='/'>
                                                        <img src={logo} alt='recipe-logo' className='logo-size' />
                                                    </Link>
                                                </motion.div>
                                            </Box>

                                            <motion.div animate={{ y: 0 }} initial={{ y: 1000 }} transition={{ duration: 0.75 }}>
                                                <Paper elevation={2} className='form-background'
                                                    sx={{
                                                        margin: {
                                                            small: '20px 0px',
                                                            tablet: '20px 40px',
                                                            laptop: '20px 75px',
                                                            desktop: '20px 100px'
                                                        },
                                                        padding: {
                                                            small: '20px 2px 20px 15px',
                                                            mobile: '30px 10px 30px 20px',
                                                            tablet: '40px 10px 40px 30px',
                                                            desktop: '50px 15px 45px 50px',
                                                            laptop: '50px 20px 50px 50px'
                                                        }
                                                    }}>

                                                    <Box>
                                                        <Box sx={{
                                                            width: {
                                                                small: '85%',
                                                                tablet: '100%'
                                                            },
                                                            margin: '10px 0px 20px 0px'
                                                        }}>
                                                            {!userInfo ?

                                                                <Alert variant="outlined" severity="error">
                                                                    Sign in to your Google Account to Create Food Recipe
                                                                </Alert>
                                                                :
                                                                <> </>

                                                            }
                                                        </Box>
                                                        <Box
                                                            className='form'
                                                            component="form"
                                                            onSubmit={(e) => { handleSubmit(e, user, userInfo.googleId) }}
                                                            sx={{
                                                                margin: {
                                                                    small: 'column',
                                                                    tablet: 'column',
                                                                },
                                                                display: {
                                                                    small: 'flex'
                                                                },
                                                                flexDirection: {
                                                                    small: 'column'
                                                                },

                                                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                                                            }}
                                                            noValidate
                                                            autoComplete="off"
                                                        >
                                                            <Box>
                                                                <Typography className='form-title'> Form Recipe Form </Typography>
                                                            </Box>

                                                            <Box sx={{
                                                                display: 'flex',
                                                                margin: '0px 30px',
                                                                flexDirection: {
                                                                    small: 'column',
                                                                    tablet: 'row'
                                                                }
                                                            }}>
                                                                <h1 className='notes'>
                                                                    <span className='notes-title'> Notes: </span>
                                                                    Reviewing your recipe posts may take 1-2 days depending on the availability of the Admin to guarantee legitimate posts from users. <br />
                                                                    For any concern, please email me <b>  marklestermoreno09@gmail.com </b> or visit my personal website
                                                                    <b> <a href='https://marklestermoreno.vercel.app/' target='_blank' rel="noreferrer" className='link-website'> marklestermoreno.vercel.app/ </a> </b>.
                                                                </h1>
                                                            </Box>

                                                            {/* Food Name */}
                                                            <Box
                                                                sx={{
                                                                    display: 'flex',
                                                                    margin: '20px 0px',
                                                                    flexDirection: {
                                                                        small: 'column',
                                                                        tablet: 'row'
                                                                    }
                                                                }}>
                                                                <FormLabel
                                                                    sx={{
                                                                        paddingTop: {
                                                                            small: '0px',
                                                                            tablet: '18px'
                                                                        },
                                                                        paddingRight: '12px',
                                                                        color: '#3b4043',
                                                                        fontWeight: '500'
                                                                    }}
                                                                >
                                                                    Food Name </FormLabel>
                                                                <TextField id="outlined-search"
                                                                    label="Food Name"
                                                                    type="search"
                                                                    required
                                                                    error={message === 'errorFoodName'}
                                                                    helperText={
                                                                        message === 'errorFoodName' ? "(Required)" : ""
                                                                    }
                                                                    disabled={loading}
                                                                    size='small'
                                                                    onChange={
                                                                        function handleFunctions(e) {
                                                                            setFood({ ...food, foodName: e.target.value });
                                                                            setMessage("")
                                                                        }
                                                                    }
                                                                    InputLabelProps={{
                                                                        required: false,
                                                                    }}
                                                                    sx={{
                                                                        "& .MuiInputLabel-root.Mui-focused": {
                                                                            color: '#01937c'
                                                                        },
                                                                        "& .MuiOutlinedInput-root.Mui-focused": {
                                                                            "& > fieldset": {
                                                                                borderColor: "#01937c",

                                                                            }
                                                                        },
                                                                        "& .MuiOutlinedInput-root": {
                                                                            width: {
                                                                                small: '85%',
                                                                                mobile: '370px',
                                                                                tablet: '520px',
                                                                                laptop: '700px',
                                                                                desktop: '800px',
                                                                                max: '500px'
                                                                            }
                                                                        }
                                                                    }}
                                                                />
                                                            </Box>

                                                            {/* Food Author */}
                                                            <Box sx={{
                                                                display: 'flex',
                                                                margin: '20px 0px',
                                                                flexDirection: {
                                                                    small: 'column',
                                                                    tablet: 'row'
                                                                }
                                                            }}>
                                                                <FormLabel
                                                                    sx={{
                                                                        paddingTop: {
                                                                            small: '0px',
                                                                            tablet: '18px'
                                                                        },
                                                                        paddingRight: '12px',
                                                                        color: '#3b4043',
                                                                        fontWeight: '500'
                                                                    }}
                                                                >
                                                                    Food Author </FormLabel>
                                                                <TextField id="outlined-search"
                                                                    label="Recipe By"
                                                                    type="search"
                                                                    disabled={loading}
                                                                    required
                                                                    error={message === 'errorFoodAuthor'}
                                                                    helperText={
                                                                        message === 'errorFoodAuthor' ? "(Required)" : ""
                                                                    }
                                                                    onChange={
                                                                        function handleFunctions(e) {
                                                                            setFood({ ...food, foodAuthor: e.target.value });
                                                                            setMessage("")
                                                                        }
                                                                    }
                                                                    size='small'
                                                                    InputLabelProps={{ required: false }}
                                                                    sx={{
                                                                        "& .MuiInputLabel-root.Mui-focused": { color: '#01937c' },//styles the label
                                                                        "& .MuiOutlinedInput-root.Mui-focused": {
                                                                            "& > fieldset": {
                                                                                borderColor: "#01937c"
                                                                            }
                                                                        },
                                                                        "& .MuiOutlinedInput-root": {
                                                                            width: {
                                                                                small: '85%',
                                                                                mobile: '370px',
                                                                                tablet: '515px',
                                                                                laptop: '695px',
                                                                                desktop: '795px',
                                                                                max: '495px'
                                                                            }
                                                                        }
                                                                    }}
                                                                />
                                                            </Box>

                                                            {/* Food Classification */}
                                                            <Box sx={{
                                                                display: 'flex',
                                                                margin: '20px 0px',
                                                                flexDirection: {
                                                                    small: 'column'
                                                                }
                                                            }}>
                                                                <FormLabel
                                                                    sx={{
                                                                        paddingTop: {
                                                                            small: '0px',
                                                                            tablet: '8px'
                                                                        },
                                                                        color: '#3b4043',
                                                                        fontWeight: '500',
                                                                        marginBottom: {
                                                                            small: '10px'
                                                                        }
                                                                    }}
                                                                >
                                                                    Food Classification </FormLabel>
                                                                <RadioGroup
                                                                    name="radio-buttons-group"
                                                                    sx={{
                                                                        color: {
                                                                            small: '#3b4043'
                                                                        },
                                                                        margin: {
                                                                            small: '0px 10px',
                                                                            tablet: '0px 20px',
                                                                            laptop: '0px 20px',
                                                                            desktop: '0px 20px'
                                                                        },


                                                                    }}
                                                                >
                                                                    <Grid container rowSpacing={1}
                                                                        onChange={
                                                                            function handleFunctions(e) {
                                                                                setFood({ ...food, classification: e.target.value });
                                                                                setMessage("")
                                                                            }
                                                                        }>
                                                                        <Grid item small={10}>
                                                                            <FormControlLabel value="main-dish"
                                                                                control={<Radio required error={message === 'error'} disabled={loading} sx={{
                                                                                    '&.Mui-checked': {
                                                                                        color: '#01937c',
                                                                                    },
                                                                                }} />} label="Main Dish" />
                                                                        </Grid>
                                                                        <Grid item small={10} >
                                                                            <FormControlLabel value="dessert" error={message === 'error'} control={<Radio required disabled={loading} sx={{
                                                                                '&.Mui-checked': {
                                                                                    color: '#01937c',
                                                                                },
                                                                            }} />} label="Dessert" />
                                                                        </Grid>
                                                                        <Grid item small={10}>
                                                                            <FormControlLabel value="beverages" error={message === 'error'} control={<Radio required disabled={loading} sx={{
                                                                                '&.Mui-checked': {
                                                                                    color: '#01937c',
                                                                                },
                                                                            }} />} label="Beverages" />
                                                                        </Grid>
                                                                        <Grid item small={10}>
                                                                            <FormControlLabel value="appetizers" error={message === 'error'} control={<Radio required disabled={loading} sx={{
                                                                                '&.Mui-checked': {
                                                                                    color: '#01937c',
                                                                                },
                                                                            }} />} label="Appetizers" />
                                                                        </Grid>
                                                                    </Grid>
                                                                    {message === 'errorClassification' ?
                                                                        <Stack spacing={2} mt={2}>
                                                                            <Alert severity="error"> Choose Food Classification</Alert>
                                                                        </Stack>
                                                                        :
                                                                        ""
                                                                    }

                                                                </RadioGroup>
                                                            </Box>

                                                            {/* Food Categories */}

                                                            {food.classification === 'main-dish' ?
                                                                <Box sx={{
                                                                    display: 'flex',
                                                                    margin: '20px 0px',
                                                                    flexDirection: {
                                                                        small: 'column'
                                                                    }
                                                                }}>
                                                                    <FormLabel
                                                                        sx={{
                                                                            paddingTop: {
                                                                                small: '0px',
                                                                                tablet: '8px'
                                                                            },
                                                                            color: '#3b4043',
                                                                            fontWeight: '500',
                                                                            marginBottom: {
                                                                                small: '10px'
                                                                            }
                                                                        }}
                                                                    >
                                                                        Food Categories </FormLabel>
                                                                    <Select
                                                                        disabled={loading}
                                                                        required
                                                                        defaultValue={food.categories}
                                                                        sx={{
                                                                            width: {
                                                                                small: '90%',
                                                                                tablet: '50%',
                                                                                up: '25%',
                                                                                max: '10%'
                                                                            },
                                                                            margin: {
                                                                                small: '0px 5px',
                                                                                tablet: '0px 10px',
                                                                                laptop: '0px 15px',
                                                                                desktop: '0px 20px'
                                                                            },

                                                                            "&.MuiOutlinedInput-root": {
                                                                                "&.Mui-focused fieldset": {
                                                                                    borderColor: "#01937c"
                                                                                }, width: {
                                                                                    small: '80%',
                                                                                    mobile: '370px',
                                                                                    tablet: '620px',
                                                                                    laptop: '800px',
                                                                                    desktop: '900px',
                                                                                    max: '580px'
                                                                                }
                                                                            }
                                                                        }}
                                                                        onChange={
                                                                            function handleFunctions(e) {
                                                                                handleChange(e);
                                                                                setMessage("")
                                                                            }
                                                                        }
                                                                        inputProps={{ 'aria-label': 'Without label' }}
                                                                    >
                                                                        <MenuItem value="">
                                                                            <em>None</em>
                                                                        </MenuItem>
                                                                        <MenuItem value='BBQ and Grilling'>BBQ and Grilling</MenuItem>
                                                                        <MenuItem value='Casseroles'>Casseroles</MenuItem>
                                                                        <MenuItem value='Meats'>Meats</MenuItem>
                                                                        <MenuItem value='Pasta'>Pasta</MenuItem>
                                                                        <MenuItem value='Pizza'>Pizza</MenuItem>
                                                                        <MenuItem value='Rice and Beans'>Rice and Beans</MenuItem>
                                                                        <MenuItem value='Salads'>Salads</MenuItem>
                                                                        <MenuItem value='Soups and Stews'>Soups and Stews</MenuItem>
                                                                        <MenuItem value='Stir-Fry'>Stir-Fry</MenuItem>
                                                                        <MenuItem value='Other'>Other</MenuItem>
                                                                    </Select>
                                                                    {message === 'errorCategories' ?
                                                                        <Stack spacing={2} mt={2}>
                                                                            <Alert severity="error"> Choose Main Dish Categories</Alert>
                                                                        </Stack>
                                                                        :
                                                                        ""
                                                                    }
                                                                </Box>
                                                                :
                                                                food.classification === 'dessert' ?
                                                                    <Box sx={{
                                                                        display: 'flex',
                                                                        margin: '20px 0px',
                                                                        flexDirection: {
                                                                            small: 'column'
                                                                        }
                                                                    }}>
                                                                        <FormLabel
                                                                            sx={{
                                                                                paddingTop: {
                                                                                    small: '0px',
                                                                                    tablet: '8px'
                                                                                },
                                                                                color: '#3b4043',
                                                                                fontWeight: '500',
                                                                                marginBottom: {
                                                                                    small: '10px'
                                                                                }
                                                                            }}
                                                                        >
                                                                            Food Categories </FormLabel>
                                                                        <Select
                                                                            disabled={loading}
                                                                            required
                                                                            defaultValue={food.categories}
                                                                            sx={{
                                                                                width: {
                                                                                    small: '90%',
                                                                                    tablet: '50%',
                                                                                    up: '25%',
                                                                                    max: '10%'
                                                                                },
                                                                                margin: {
                                                                                    small: '0px 5px',
                                                                                    tablet: '0px 10px',
                                                                                    laptop: '0px 15px',
                                                                                    desktop: '0px 20px'
                                                                                },

                                                                                "&.MuiOutlinedInput-root": {
                                                                                    "&.Mui-focused fieldset": {
                                                                                        borderColor: "#01937c"
                                                                                    }, width: {
                                                                                        small: '80%',
                                                                                        mobile: '370px',
                                                                                        tablet: '620px',
                                                                                        laptop: '800px',
                                                                                        desktop: '900px',
                                                                                        max: '580px'
                                                                                    }
                                                                                }
                                                                            }}
                                                                            onChange={
                                                                                function handleFunctions(e) {
                                                                                    handleChange(e);
                                                                                    setMessage("")
                                                                                }
                                                                            }
                                                                            inputProps={{ 'aria-label': 'Without label' }}
                                                                        >
                                                                            <MenuItem value="">
                                                                                <em>None</em>
                                                                            </MenuItem>
                                                                            <MenuItem value='Cakes'>Cakes</MenuItem>
                                                                            <MenuItem value='Cookies'>Cookies</MenuItem>
                                                                            <MenuItem value='Biscuits'>Biscuits</MenuItem>
                                                                            <MenuItem value='Pastries'>Pastries</MenuItem>
                                                                            <MenuItem value='Candies'>Candies</MenuItem>
                                                                            <MenuItem value='Custards and Puddings'>Custards and Puddings</MenuItem>
                                                                            <MenuItem value='Deep-Fried'>Deep-Fried</MenuItem>
                                                                            <MenuItem value='Frozen'>Frozen</MenuItem>
                                                                            <MenuItem value='Gelatin'>Gelatin</MenuItem>
                                                                            <MenuItem value='Fruit'>Fruit</MenuItem>
                                                                            <MenuItem value='Other'>Other</MenuItem>
                                                                        </Select>
                                                                        {message === 'errorCategories' ?
                                                                            <Stack spacing={2} mt={2}>
                                                                                <Alert severity="error"> Choose Dessert Categories</Alert>
                                                                            </Stack>
                                                                            :
                                                                            ""
                                                                        }
                                                                    </Box>
                                                                    :
                                                                    food.classification === 'beverages' ?
                                                                        <Box sx={{
                                                                            display: 'flex',
                                                                            margin: '20px 0px',
                                                                            flexDirection: {
                                                                                small: 'column'
                                                                            }
                                                                        }}>
                                                                            <FormLabel
                                                                                sx={{
                                                                                    paddingTop: {
                                                                                        small: '0px',
                                                                                        tablet: '8px'
                                                                                    },
                                                                                    color: '#3b4043',
                                                                                    fontWeight: '500',
                                                                                    marginBottom: {
                                                                                        small: '10px'
                                                                                    }
                                                                                }}
                                                                            >
                                                                                Food Categories </FormLabel>
                                                                            <Select
                                                                                disabled={loading}
                                                                                required
                                                                                defaultValue={food.categories}
                                                                                sx={{
                                                                                    width: {
                                                                                        small: '90%',
                                                                                        tablet: '50%',
                                                                                        up: '25%',
                                                                                        max: '10%'
                                                                                    },
                                                                                    margin: {
                                                                                        small: '0px 5px',
                                                                                        tablet: '0px 10px',
                                                                                        laptop: '0px 15px',
                                                                                        desktop: '0px 20px'
                                                                                    },

                                                                                    "&.MuiOutlinedInput-root": {
                                                                                        "&.Mui-focused fieldset": {
                                                                                            borderColor: "#01937c"
                                                                                        }, width: {
                                                                                            small: '80%',
                                                                                            mobile: '370px',
                                                                                            tablet: '620px',
                                                                                            laptop: '800px',
                                                                                            desktop: '900px',
                                                                                            max: '580px'
                                                                                        }
                                                                                    }
                                                                                }}
                                                                                onChange={
                                                                                    function handleFunctions(e) {
                                                                                        handleChange(e);
                                                                                        setMessage("")
                                                                                    }
                                                                                }
                                                                                inputProps={{ 'aria-label': 'Without label' }}
                                                                            >
                                                                                <MenuItem value="">
                                                                                    <em>None</em>
                                                                                </MenuItem>
                                                                                <MenuItem value='Alcoholic'>Alcoholic</MenuItem>
                                                                                <MenuItem value='Non Alcoholic'>Non Alcoholic</MenuItem>
                                                                                <MenuItem value='Other'>Other</MenuItem>
                                                                            </Select>
                                                                            {message === 'errorCategories' ?
                                                                                <Stack spacing={2} mt={2}>
                                                                                    <Alert severity="error"> Choose Beverages Categories </Alert>
                                                                                </Stack>
                                                                                :
                                                                                ""
                                                                            }
                                                                        </Box>
                                                                        :
                                                                        food.classification === 'appetizers' ?
                                                                            <Box sx={{
                                                                                display: 'flex',
                                                                                margin: '20px 0px',
                                                                                flexDirection: {
                                                                                    small: 'column'
                                                                                }
                                                                            }}>
                                                                                <FormLabel
                                                                                    sx={{
                                                                                        paddingTop: {
                                                                                            small: '0px',
                                                                                            tablet: '8px'
                                                                                        },
                                                                                        color: '#3b4043',
                                                                                        fontWeight: '500',
                                                                                        marginBottom: {
                                                                                            small: '10px'
                                                                                        }
                                                                                    }}
                                                                                >
                                                                                    Food Categories </FormLabel>
                                                                                <Select
                                                                                    defaultValue={food.categories}
                                                                                    disabled={loading}
                                                                                    required
                                                                                    sx={{
                                                                                        width: {
                                                                                            small: '90%',
                                                                                            tablet: '50%',
                                                                                            up: '25%',
                                                                                            max: '10%'
                                                                                        },
                                                                                        margin: {
                                                                                            small: '0px 5px',
                                                                                            tablet: '0px 10px',
                                                                                            laptop: '0px 15px',
                                                                                            desktop: '0px 20px'
                                                                                        },

                                                                                        "&.MuiOutlinedInput-root": {
                                                                                            "&.Mui-focused fieldset": {
                                                                                                borderColor: "#01937c"
                                                                                            }, width: {
                                                                                                small: '80%',
                                                                                                mobile: '370px',
                                                                                                tablet: '620px',
                                                                                                laptop: '800px',
                                                                                                desktop: '900px',
                                                                                                max: '580px'
                                                                                            }
                                                                                        }
                                                                                    }}
                                                                                    onChange={
                                                                                        function handleFunctions(e) {
                                                                                            handleChange(e);
                                                                                            setMessage("")
                                                                                        }
                                                                                    }
                                                                                    inputProps={{ 'aria-label': 'Without label' }}
                                                                                >
                                                                                    <MenuItem value="">
                                                                                        <em>None</em>
                                                                                    </MenuItem>
                                                                                    <MenuItem value='Cocktails'>Cocktails</MenuItem>
                                                                                    <MenuItem value='Canape'>Canape</MenuItem>
                                                                                    <MenuItem value='Relishes/Crudite'>Relishes/Crudite</MenuItem>
                                                                                    <MenuItem value='Salads'>Salads</MenuItem>
                                                                                    <MenuItem value='Soup & Consommé'>Soup & Consommé</MenuItem>
                                                                                    <MenuItem value='Chips & Dips'>Chips & Dips</MenuItem>
                                                                                    <MenuItem value='Hors d’ oeuvres'>Hors d’ oeuvres</MenuItem>
                                                                                    <MenuItem value='Other'>Other</MenuItem>
                                                                                </Select>
                                                                                {message === 'errorCategories' ?
                                                                                    <Stack spacing={2} mt={2}>
                                                                                        <Alert severity="error"> Choose Appetizers Categories</Alert>
                                                                                    </Stack>
                                                                                    :
                                                                                    ""
                                                                                }
                                                                            </Box>
                                                                            :
                                                                            ""
                                                            }
                                                            {/* Food Difficulty */}
                                                            <Box sx={{
                                                                display: 'flex',
                                                                margin: '20px 0px',
                                                                flexDirection: {
                                                                    small: 'column'
                                                                }
                                                            }}>
                                                                <FormLabel
                                                                    sx={{
                                                                        paddingTop: {
                                                                            small: '0px',
                                                                            tablet: '8px'
                                                                        },
                                                                        color: '#3b4043',
                                                                        fontWeight: '500',
                                                                        marginBottom: {
                                                                            small: '10px'
                                                                        }
                                                                    }}
                                                                >
                                                                    Food Difficulty </FormLabel>
                                                                <RadioGroup
                                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                                    name="radio-buttons-group"
                                                                    sx={{
                                                                        color: {
                                                                            small: '#3b4043'
                                                                        },
                                                                        margin: {
                                                                            small: '0px 10px',
                                                                            tablet: '0px 20px',
                                                                            laptop: '0px 20px',
                                                                            desktop: '0px 20px'
                                                                        }
                                                                    }}
                                                                >
                                                                    <Grid container rowSpacing={1}
                                                                        onChange={
                                                                            function handleFunctions(e) {
                                                                                setFood({ ...food, difficulty: e.target.value })
                                                                                setMessage("")
                                                                            }}>
                                                                        <Grid item small={10} >
                                                                            <FormControlLabel value="easy"
                                                                                control={<Radio
                                                                                    disabled={loading}
                                                                                    required
                                                                                    error={message === 'error'}
                                                                                    sx={{
                                                                                        '&.Mui-checked': {
                                                                                            color: '#01937c',
                                                                                        },
                                                                                    }} />} label="Easy" />
                                                                        </Grid>
                                                                        <Grid item small={10} >
                                                                            <FormControlLabel value="intermediate"
                                                                                control={<Radio disabled={loading}
                                                                                    required
                                                                                    error={message === 'error'}
                                                                                    sx={{
                                                                                        '&.Mui-checked': {
                                                                                            color: '#01937c',
                                                                                        },
                                                                                    }} />} label="Intermediate" />
                                                                        </Grid>
                                                                        <Grid item small={10}>
                                                                            <FormControlLabel value="advanced"
                                                                                control={<Radio disabled={loading}
                                                                                    required
                                                                                    error={message === 'error'}
                                                                                    sx={{
                                                                                        '&.Mui-checked': {
                                                                                            color: '#01937c',
                                                                                        },
                                                                                    }} />} label="Advanced" />
                                                                        </Grid>

                                                                    </Grid>

                                                                    {message === 'errorDifficulty' ?
                                                                        <Stack spacing={2} mt={2}>
                                                                            <Alert severity="error"> Choose Food Difficulty</Alert>
                                                                        </Stack>
                                                                        :
                                                                        ""
                                                                    }
                                                                </RadioGroup>
                                                            </Box>


                                                            {/* Yields */}
                                                            <Box sx={{
                                                                display: 'flex',
                                                                margin: '20px 0px',
                                                                flexDirection: {
                                                                    small: 'column',
                                                                    tablet: 'row'
                                                                }
                                                            }}>
                                                                <FormLabel
                                                                    sx={{
                                                                        paddingTop: {
                                                                            small: '0px',
                                                                            tablet: '18px'
                                                                        },
                                                                        paddingRight: '12px',
                                                                        color: '#3b4043',
                                                                        fontWeight: '500'
                                                                    }}
                                                                >
                                                                    Servings </FormLabel>
                                                                <TextField id="outlined-search"
                                                                    label="Servings"
                                                                    type="number"
                                                                    disabled={loading}
                                                                    error={message === 'errorYields'}
                                                                    helperText={
                                                                        message === 'errorTime' ? "Invalid Number" : ""
                                                                    }
                                                                    required
                                                                    size='small'
                                                                    onChange={
                                                                        function handleFunctions(e) {
                                                                            setFood({ ...food, yields: e.target.value })
                                                                            setMessage("")
                                                                        }}
                                                                    InputProps={{
                                                                        inputProps: { min: 0 }

                                                                    }}
                                                                    onInput={(e) => {
                                                                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 3)
                                                                    }}
                                                                    onKeyPress={(event) => {
                                                                        if (event?.key === '-' || event?.key === '+') {
                                                                            event.preventDefault();
                                                                        }
                                                                    }}
                                                                    InputLabelProps={{ required: false }}
                                                                    sx={{
                                                                        "& .MuiInputLabel-root.Mui-focused": { color: '#01937c' },//styles the label
                                                                        "& .MuiOutlinedInput-root.Mui-focused": {
                                                                            "& > fieldset": {
                                                                                borderColor: "#01937c"
                                                                            }
                                                                        },
                                                                        "& .MuiOutlinedInput-root": {
                                                                            width: {
                                                                                small: '85%',
                                                                                mobile: '100%',

                                                                            }
                                                                        }
                                                                    }}
                                                                />
                                                            </Box>


                                                            {/* Time */}
                                                            <Box sx={{
                                                                display: 'flex',
                                                                margin: '20px 0px',
                                                                flexDirection: {
                                                                    small: 'column',
                                                                    tablet: 'row'
                                                                }
                                                            }}>
                                                                <FormLabel
                                                                    sx={{
                                                                        paddingTop: {
                                                                            small: '0px',
                                                                            tablet: '18px'
                                                                        },
                                                                        paddingRight: '12px',
                                                                        color: '#3b4043',
                                                                        fontWeight: '500'
                                                                    }}
                                                                >
                                                                    Time Preparation </FormLabel>
                                                                <TextField id="outlined-search"
                                                                    label="Minutes"
                                                                    type="number"
                                                                    disabled={loading}
                                                                    error={message === 'errorTime'}
                                                                    helperText={
                                                                        message === 'errorTime' ? "Invalid Time" : ""
                                                                    }
                                                                    required
                                                                    size='small'
                                                                    onChange={
                                                                        function handleFunctions(e) {
                                                                            setFood({ ...food, time: e.target.value })
                                                                            setMessage("")
                                                                        }}
                                                                    InputProps={{
                                                                        inputProps: { min: 0 }

                                                                    }}
                                                                    onInput={(e) => {
                                                                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 4)
                                                                    }}
                                                                    onKeyPress={(event) => {
                                                                        if (event?.key === '-' || event?.key === '+') {
                                                                            event.preventDefault();
                                                                        }
                                                                    }}
                                                                    InputLabelProps={{ required: false }}
                                                                    sx={{
                                                                        "& .MuiInputLabel-root.Mui-focused": { color: '#01937c' },//styles the label
                                                                        "& .MuiOutlinedInput-root.Mui-focused": {
                                                                            "& > fieldset": {
                                                                                borderColor: "#01937c"
                                                                            }
                                                                        },
                                                                        "& .MuiOutlinedInput-root": {
                                                                            width: {
                                                                                small: '85%',
                                                                                mobile: '100%',

                                                                            }
                                                                        }
                                                                    }}
                                                                />
                                                            </Box>

                                                            {/* Food Ingredients (Max of 20) */}
                                                            <Box sx={{
                                                                display: 'flex',
                                                                margin: '20px 0px',
                                                                flexDirection: {
                                                                    small: 'column',
                                                                    tablet: 'row'
                                                                }
                                                            }}>
                                                                <FormLabel
                                                                    sx={{
                                                                        paddingTop: {
                                                                            small: '0px',
                                                                            tablet: '18px'
                                                                        },
                                                                        paddingRight: '12px',
                                                                        color: '#3b4043',
                                                                        fontWeight: '500'
                                                                    }}
                                                                >
                                                                    Ingredients </FormLabel>
                                                                <Box sx={{
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                }}>
                                                                    {food.ingredients.map((ing, i) => (
                                                                        <>

                                                                            <TextField
                                                                                label={`Ingredients Name ${i + 1}`}
                                                                                placeholder='E.g. 1/4 Onion'
                                                                                required
                                                                                key={i}
                                                                                disabled={loading}
                                                                                value={ing}
                                                                                inputProps={{ maxLength: 50, min: 1 }}
                                                                                error={message === 'errorIngredients'}
                                                                                helperText={
                                                                                    message === 'errorIngredients' ? "(Required)" : ""
                                                                                }
                                                                                name="ingredientsName"
                                                                                onChange={
                                                                                    function handleFunctions(e) {
                                                                                        handleIngredients(e, i)
                                                                                        setMessage("")

                                                                                    }}
                                                                                size='small'
                                                                                InputLabelProps={{ required: false }}
                                                                                sx={{
                                                                                    "& .MuiInputLabel-root.Mui-focused": { color: '#01937c' },//styles the label
                                                                                    "& .MuiOutlinedInput-root.Mui-focused": {
                                                                                        "& > fieldset": {
                                                                                            borderColor: "#01937c"
                                                                                        }
                                                                                    },
                                                                                    "& .MuiOutlinedInput-root": {
                                                                                        width: {
                                                                                            small: '85%',
                                                                                            mobile: '370px',
                                                                                            tablet: '255px',
                                                                                            laptop: '455px',
                                                                                            desktop: '555px',
                                                                                            max: '230px'
                                                                                        },

                                                                                    }
                                                                                }}
                                                                            />

                                                                        </>
                                                                    ))}
                                                                    <Box>
                                                                        <Button
                                                                            onClick={handleIngredientsCount}
                                                                            disabled={food.ingredients.length >= 20 || food.ingredients.map((ing) => (ing !== '')).at(-1) === false}
                                                                            sx={{
                                                                                color: '#01937c',
                                                                                marginTop: {
                                                                                    tablet: '13px'
                                                                                }
                                                                            }}>
                                                                            Add Ingredients
                                                                        </Button>

                                                                        <Button
                                                                            onClick={removeIngredients}
                                                                            disabled={food.ingredients < 1}
                                                                            sx={{
                                                                                marginTop: {
                                                                                    tablet: '13px'
                                                                                },
                                                                                color: 'red'
                                                                            }}>
                                                                            Remove Ingredients
                                                                        </Button>
                                                                    </Box>
                                                                    {message === 'errorIngredients' ?
                                                                        <Stack spacing={2} mt={2}>
                                                                            <Alert severity="error"> Ingredients Required </Alert>
                                                                        </Stack>
                                                                        :
                                                                        ""
                                                                    }
                                                                </Box>
                                                            </Box>

                                                            {/* Steps */}

                                                            <Box sx={{
                                                                display: 'flex',
                                                                margin: '40px 0px',
                                                                flexDirection: {
                                                                    small: 'column',
                                                                    tablet: 'row'
                                                                },
                                                            }}>
                                                                <FormLabel
                                                                    sx={{
                                                                        paddingTop: {
                                                                            small: '0px',
                                                                            tablet: '8px'
                                                                        },
                                                                        paddingRight: '12px',
                                                                        color: '#3b4043',
                                                                        fontWeight: '500',
                                                                        paddingBottom: '10px'
                                                                    }}
                                                                >
                                                                    Steps </FormLabel>

                                                                <Box sx={{
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                }}>
                                                                    {food.steps.map((step, i) => (
                                                                        <TextareaAutosize
                                                                            key={i}
                                                                            value={step}
                                                                            maxRows={5}
                                                                            disabled={loading}
                                                                            required
                                                                            maxLength={450}
                                                                            placeholder={`Step ${1 + i}`}
                                                                            className={
                                                                                message === 'errorSteps' ?
                                                                                    'steps-field-error'
                                                                                    :
                                                                                    'steps-field'
                                                                            }
                                                                            onChange={
                                                                                function handleFunctions(e) {
                                                                                    handleSteps(e, i)
                                                                                    setMessage("")
                                                                                }}
                                                                        />
                                                                    ))}

                                                                    <Box>
                                                                        <Button
                                                                            onClick={handleStepsCount}
                                                                            disabled={food.steps.length >= 20}
                                                                            sx={{
                                                                                color: '#01937c',
                                                                                marginTop: {
                                                                                    tablet: '2px'
                                                                                }
                                                                            }}>
                                                                            Add Steps
                                                                        </Button>

                                                                        <Button
                                                                            onClick={deleteSteps}
                                                                            disabled={food.steps < 1}
                                                                            sx={{
                                                                                color: 'red',
                                                                                marginTop: {
                                                                                    tablet: '2px'
                                                                                }
                                                                            }}>
                                                                            Remove Steps
                                                                        </Button>
                                                                    </Box>
                                                                    {message === 'errorSteps' ?
                                                                        <Stack spacing={2} mt={2}>
                                                                            <Alert severity="error"> Steps Required </Alert>
                                                                        </Stack>
                                                                        :
                                                                        ""
                                                                    }
                                                                </Box>

                                                            </Box>

                                                            <FileInput
                                                                name='image'
                                                                type='image'
                                                                food={food}
                                                                message={message}
                                                                disabled={food.classification === ""}
                                                                handleInputState={handleInputState}
                                                                value={food.image}
                                                            />



                                                            { /* Submit */}
                                                            <Box sx={{
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                margin: '30px 0px',
                                                                padding: '0px 50px',
                                                                flexDirection: {
                                                                    small: 'column',
                                                                    tablet: 'row'
                                                                },
                                                            }}>
                                                                <Button
                                                                    onClick={() => navigate('/')}
                                                                    size="large"
                                                                    endIcon={<KeyboardReturnIcon />}
                                                                    loading={loading}
                                                                    loadingposition="end"
                                                                    variant="outlined"
                                                                    sx={{
                                                                        borderColor: '#3b4043',
                                                                        border: '1.5px solid',
                                                                        color: '#01937c',
                                                                        '&:hover': {
                                                                            backgroundColor: '#01937c',
                                                                            borderColor: '#01937c',
                                                                            color: 'white',
                                                                        },
                                                                        width: {
                                                                            small: '90%',
                                                                            mobile: '100%',
                                                                        },
                                                                        marginRight: {
                                                                            small: '0px',
                                                                            tablet: '30px'
                                                                        }
                                                                    }}
                                                                >
                                                                    Back
                                                                </Button>
                                                                <Button
                                                                    size="large"
                                                                    type='submit'
                                                                    disabled={loading || !userInfo }
                                                                    endIcon={<SendIcon />}
                                                                    loadingposition="end"
                                                                    variant="contained"
                                                                    sx={{
                                                                        background: '#01937c',
                                                                        color: 'white',
                                                                        '&:hover': {
                                                                            backgroundColor: 'white',
                                                                            borderColor: '#01937c',
                                                                            color: '#3b4043'
                                                                        },
                                                                        marginTop: {
                                                                            small: '20px',
                                                                            tablet: '0px'
                                                                        },
                                                                        width: {
                                                                            small: '90%',
                                                                            mobile: '100%',
                                                                        },

                                                                    }}
                                                                >
                                                                    Post
                                                                </Button>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Paper>
                                            </motion.div>
                                        </Box>
                                    </Box>
                                    :
                                    ""
                            )}
                    </Responsive>
                </ThemeProvider>
                :
                navigate("/")
             }
        </>
    )
}

export default CreateCards