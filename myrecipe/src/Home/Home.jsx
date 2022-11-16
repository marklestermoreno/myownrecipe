import React, { useState, useEffect } from 'react'
import usePagination from "./home";
import { NavLink, Link, useNavigate } from 'react-router-dom'

// Material UI
import {
    Typography, ThemeProvider, Button,
    Box, TextField, Avatar, Grid, Pagination,
    Backdrop, Modal, Fade, CardMedia, Rating, Skeleton
} from "@mui/material";

import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// CSS 
import './Home.scss'

// Images and Icons
import logo from '../assets/logo.png'

// Responsiveness
import { theme } from "../responsive.js";
import { Responsive } from './home'

// Cards Categories
import Appetizers from '../Cards/Appetizers'
import Beverages from '../Cards/Beverages'
import Dessert from '../Cards/Dessert'
import MainDish from '../Cards/MainDish'

// Context 
import { useRecipeContext } from '../context/recipeContext';

// Google Auth
import { GoogleLogin } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script'
import axios from 'axios'

// Framer Motion

import { motion } from 'framer-motion'

const Home = () => {

    const navigate = useNavigate()

    // Google Auth
    const userInfo = JSON.parse(localStorage.getItem('user'));

    const clientId = process.env.REACT_APP_CLIENT_ID;
    const [loginAlert, setLoginAlert] = React.useState(false);

    const handleClick = () => {
        setLoginAlert(true);
    };

    const closeLoginAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setLoginAlert(false);
    };

    const { closeAlert, alert, data, loading, closeDeleted, deleted } = useRecipeContext()


    // Login
    const onSuccess = async (res) => {
        console.log("Login Success: Current User: ", res.profileObj)

        localStorage.setItem('user', JSON.stringify(res.profileObj))

        const { name, googleId, imageUrl, email } = res.profileObj;

        const doc = {
            userId: googleId,
            type: 'user',
            email: email,
            userName: name,
            image: imageUrl,
            rated: [],
            saved: []
        };

        try {
            const url = process.env.REACT_APP_API_URL + "/user";
            const { doc: respond } = await axios.post(url, doc);
            console.log(respond)
        }
        catch (error) {
            console.log(error)

        }

        setTimeout(function () {
            window.location.reload();
        }, 1000);

        handleClick()
    }


    const onFailure = (res) => {
        console.log("Login Failed! res: ", res)
    }


    // Logout

    const onSuccessLogout = () => {
        console.log("Logout Successful")
        localStorage.clear();
        window.location.reload();
    }


    const [open, setOpen] = useState(false)

    // const navigate = useNavigate()

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const [showCategories, setShowCategories] = useState(false)

    const showMore = () => {
        setShowCategories(true)
    }

    const showLess = () => {
        setShowCategories(false)
    }

    const [searchString, setSearchString] = useState('')

    const [dish, setDish] = useState([])

    useEffect(() => {

        setDish(data)

        function start() {
            gapi.client.init({
                clientId: clientId,
                scope: ""
            })
        };

        gapi.load('client:auth2', start)


        // eslint-disable-next-line
    }, [searchString, showCategories]);

    // Sorting All Dish 

    const [order, setOrder] = useState('asc')

    const sorting = (col) => {
        if (order === 'asc') {
            const sorted = [...data].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
            );
            setDish(sorted);
            setOrder("dsc")

        }
        if (order === 'dsc') {
            const sorted = [...data].sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
            );
            setDish(sorted);
            setOrder("asc")
        }
    }

    const sortingRating = (rating, user) => {
        if (order === 'asc') {
            const sorted = [...data].sort((a, b) =>
                a[rating] / a[user] > b[rating] / b[user] ? 1 : -1
            );
            setDish(sorted);
            setOrder("dsc")

        }
        if (order === 'dsc') {
            const sorted = [...data].sort((a, b) =>
                a[rating] / a[user] > b[rating] / b[user] ? -1 : 1
            );
            setDish(sorted);
            setOrder("asc")
        }
    }

    // Pagination All Dish

    let [pageAll, setPageAll] = useState(1);
    const PER_PAGEAll = 12;

    const countAll = Math.ceil(dish.length / PER_PAGEAll);
    const _DATAAll = usePagination(dish, PER_PAGEAll);

    const handleChangeAll = (e, p) => {
        setPageAll(p);
        _DATAAll.jump(p);
    };


    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });


    return (
        <>
            <ThemeProvider theme={theme}>
                <Responsive>

                    <Box className='header'
                        sx={{
                            flexDirection: {
                                small: 'column',
                                tablet: 'row',
                            },

                            margin: {
                                small: '20px 40px',
                                tablet: '40px 100px'
                            }

                        }}>
                        <motion.div animate={{ x: 0 }} initial={{ x: -1000 }} transition={{ duration: 0.5 }}>
                            <Link to='/'>
                                <img src={logo} alt='recipe-logo' className='logo-size' />
                            </Link>
                        </motion.div>
                        <motion.div animate={{ x: 0 }} initial={{ x: 1000 }} transition={{ duration: 0.5 }}>
                            <Box
                                noValidate
                                className='header-right'
                                autoComplete="off">

                                <TextField
                                    className="textarea"
                                    label="Search Recipe"
                                    variant="outlined"
                                    value={searchString}
                                    onChange={(e) => setSearchString(e.target.value)}
                                    size="small"
                                    sx={{
                                        "& .MuiInputLabel-root.Mui-focused": { color: '#01937c' },//styles the label
                                        "& .MuiOutlinedInput-root.Mui-focused": {
                                            "& > fieldset": {
                                                borderColor: "#01937c"
                                            }
                                        },
                                        margin: {
                                            small: '10px',
                                            tablet: '0px'
                                        },

                                        width: {
                                            up: '250px',
                                            max: '300px'
                                        }
                                    }}
                                />

                                {/* Login */}

                                <Snackbar open={loginAlert} autoHideDuration={5000} onClose={closeLoginAlert}
                                    anchorOrigin=
                                    {{
                                        horizontal: 'right',
                                        vertical: 'top'
                                    }}>
                                    <Alert onClose={closeLoginAlert} severity="success"
                                        sx={{
                                            width: {
                                                small: '100%',
                                                tablet: '30%',
                                                laptop: '20%'
                                            }
                                        }}>
                                        Login Successfully
                                    </Alert>
                                </Snackbar>

                                {/* Added */}

                                <Snackbar open={alert} autoHideDuration={5000} onClose={closeAlert}
                                    anchorOrigin=
                                    {{
                                        horizontal: 'right',
                                        vertical: 'top'
                                    }}>
                                    <Alert onClose={closeAlert} severity="success"
                                        sx={{
                                            width: {
                                                small: '100%',
                                                tablet: '30%',
                                                laptop: '20%'
                                            }
                                        }}>
                                        Recipe Food Sent
                                    </Alert>
                                </Snackbar>

                                {/* Deleted */}

                                <Snackbar open={deleted} autoHideDuration={5000} onClose={closeDeleted}
                                    anchorOrigin=
                                    {{
                                        horizontal: 'right',
                                        vertical: 'top'
                                    }}>
                                    <Alert onClose={closeDeleted} severity="success"
                                        sx={{
                                            width: {
                                                small: '100%',
                                                tablet: '30%',
                                                laptop: '20%'
                                            }
                                        }}>
                                        Recipe Food Deleted
                                    </Alert>
                                </Snackbar>

                                {userInfo ?

                                    <button className='signin' onClick={handleOpen}>
                                        <Avatar
                                            alt="Mark Lester Moreno"
                                            className='avatar'
                                            src={userInfo?.imageUrl}
                                            sx={{
                                                width: 30,
                                                height: 30,
                                                display: {
                                                    small: 'none',
                                                    tablet: 'flex'
                                                }
                                            }}
                                        />
                                    </button>
                                    :
                                    <GoogleLogin
                                        clientId={clientId}
                                        buttonText="Login as Google"
                                        onSuccess={onSuccess}
                                        onFailure={onFailure}
                                        cookiePolicy={'single_host_origin'}
                                        isSignedIn={true}
                                        theme="filled_blue"
                                        render={(renderProps) => (
                                            <button onClick={renderProps.onClick} variant="contained"
                                                className='signin'
                                                sx={{
                                                    backgroundColor: '#01937c',
                                                    padding: '5px'
                                                }}>
                                                <Avatar
                                                    alt="Mark Lester Moreno"
                                                    className='avatar'
                                                    sx={{
                                                        width: 30,
                                                        height: 30,
                                                        display: {
                                                            small: 'none',
                                                            tablet: 'flex'
                                                        }
                                                    }}
                                                />
                                            </button>
                                        )}
                                    />

                                }



                                <Box
                                    sx={{
                                        display: {
                                            small: 'display',
                                            tablet: 'none'
                                        }
                                    }}>

                                    {userInfo ?
                                        <div class="floating-container">
                                            <div class="floating-button" >
                                                <Avatar
                                                    onClick={handleOpen}
                                                    alt="Mark Lester Moreno"
                                                    sx={{ width: '65px', height: '65px' }}
                                                    src={userInfo?.imageUrl}
                                                    fontSize='10px' />
                                            </div>
                                        </div>
                                        :

                                        <GoogleLogin
                                            clientId={clientId}
                                            buttonText="Login as Google"
                                            onSuccess={onSuccess}
                                            onFailure={onFailure}
                                            cookiePolicy={'single_host_origin'}
                                            isSignedIn={true}
                                            theme="filled_blue"
                                            render={(renderProps) => (
                                                <div class="floating-container">

                                                    <button onClick={renderProps.onClick} variant="contained"
                                                        className='signin'
                                                        sx={{
                                                            backgroundColor: '#01937c',
                                                            padding: '5px'
                                                        }}>
                                                        <div class="floating-button">
                                                            <AccountCircleIcon className='contacts' fontSize='10px' />
                                                        </div>

                                                    </button>
                                                    <div class="element-container">
                                                    </div>
                                                </div>
                                            )}
                                        />
                                    }
                                </Box>
                            </Box>
                        </motion.div>
                    </Box>

                    { /* Search Query */}
                    {searchString === '' ? "" :
                        <>
                            <Box sx={{
                                flexDirection: {
                                    small: 'column',
                                },
                                margin: {
                                    small: '20px 40px',
                                    tablet: '40px 110px'
                                }

                            }}>
                                <Typography
                                    color='#2c2c2c'
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: {
                                            small: '20px',
                                            tablet: '25px'
                                        }
                                    }}> Searched
                                </Typography>

                                <Box sx={{ margin: '10px 0px' }}>
                                    <button onClick={() => sorting('foodName')} className='sort-name'>
                                        Sort by Name
                                    </button>

                                    <button onClick={() => sortingRating('rating', 'user')} className='sort-rate'>
                                        Sort by Rate
                                    </button>

                                    <button onClick={() => sorting('categories')} className='sort-rate'>
                                        Sort by Categories
                                    </button>

                                    <button onClick={() => sorting('createdAt')} className='sort-rate'>
                                        Date Created
                                    </button>
                                </Box>


                                <Box sx={{ margin: '30px 0px' }} >
                                    <Grid container direction='row' spacing={3}>
                                        {
                                            // eslint-disable-next-line
                                            _DATAAll.currentData().filter((val) => {
                                                if (searchString === "") {
                                                    return val
                                                }
                                                else if (val.foodName.toLowerCase().includes(searchString.toLowerCase())) {
                                                    return val;
                                                }
                                            }).map((food) => (

                                                food.approved === true ?
                                                    <Grid item small={20} tablet={20} laptop={6} desktop={4} up={3} max={1} key={food._id} className='cards'>
                                                        {loading === true ?
                                                            <Skeleton variant="rectangular" height={200} animation="wave" />
                                                            :
                                                            <NavLink to={`/${food.classification}/${food._id}/${food.userId}`} className='cards-destination'>
                                                                <CardMedia
                                                                    component="img"
                                                                    alt=""
                                                                    height="170"
                                                                    image={food.image}
                                                                    sx={{
                                                                        borderRadius: '10px'
                                                                    }}
                                                                />

                                                                <Typography color='#2c2c2c'
                                                                    sx={{
                                                                        fontWeight: 500,
                                                                        fontSize: {
                                                                            small: '15px',
                                                                            tablet: '20px'
                                                                        },
                                                                        margin: '10px 0px 0px 10px'
                                                                    }}>
                                                                    {food.foodName}
                                                                </Typography>
                                                                <Typography color='#2c2c2c'
                                                                    sx={{
                                                                        color: '#3b4043',
                                                                        fontWeight: 500,
                                                                        fontSize: {
                                                                            small: '10px',
                                                                            tablet: '15px'
                                                                        },
                                                                        margin: '0px 0px 5px 10px'
                                                                    }}>
                                                                    by: {food.foodAuthor}
                                                                </Typography>

                                                                <Box sx={{ display: 'flex' }}>
                                                                    <Rating name="read-only" value={food.rating / food.user} precision={0.2} size="small" readOnly
                                                                        sx={{
                                                                            margin: '0px 0px 10px 8px'
                                                                        }} />
                                                                    <Typography
                                                                        color='#2c2c2c'
                                                                        sx={{
                                                                            color: '#3b4043',
                                                                            fontWeight: 500,
                                                                            fontSize: {
                                                                                small: '8px',
                                                                                tablet: '13px'
                                                                            },
                                                                            margin: '0px 0px 5px 5px'
                                                                        }}>
                                                                        ({food.user} User Rated)
                                                                    </Typography>
                                                                </Box>
                                                            </NavLink>
                                                        }
                                                    </Grid>
                                                    :
                                                    ""
                                            ))

                                        }
                                    </Grid>
                                </Box>

                                <Pagination count={countAll} page={pageAll} onChange={handleChangeAll} />
                            </Box>
                        </>
                    }


                    { /* Top Rated */}

                    <Box sx={{
                        flexDirection: {
                            small: 'column',
                        },
                        margin: {
                            small: '20px 40px',
                            tablet: '40px 110px'
                        }

                    }}>
                        <motion.div animate={{ x: 0 }} initial={{ x: -1000 }} transition={{ duration: 0.5 }}>
                            <Typography
                                color='#2c2c2c'
                                sx={{
                                    fontWeight: 600,
                                    fontSize: {
                                        small: '20px',
                                        tablet: '25px'
                                    }
                                }}> Top 6 Rated Recipe
                            </Typography>
                        </motion.div>

                        <motion.div animate={{ y: 0 }} initial={{ y: 1000 }} transition={{ duration: 0.5 }}>
                            <Box sx={{ margin: '30px 0px' }} >
                                <Grid container direction='row' spacing={3}>
                                    {
                                        data.filter((approved) => (approved.approved === true)).sort((a, b) =>
                                        (
                                            (a.rating > b.rating) ? -1 : 1)

                                        )
                                            .slice(0, 6).map((food) => (

                                                <Grid item small={20} tablet={20} laptop={6} desktop={4} up={3} max={1} key={food._id} className='cards' >
                                                    {loading === true ?
                                                        <Skeleton variant="rectangular" height={200} animation="wave" />
                                                        :
                                                        <NavLink to={`/${food.classification}/${food._id}/${food.userId}`} className='cards-destination'>
                                                            <CardMedia
                                                                component="img"
                                                                alt=""
                                                                height="170"
                                                                image={food.image}
                                                                sx={{
                                                                    borderRadius: '10px'
                                                                }}
                                                            />
                                                            <Typography color='#2c2c2c'
                                                                sx={{
                                                                    fontWeight: 500,
                                                                    fontSize: {
                                                                        small: '15px',
                                                                        tablet: '20px'
                                                                    },
                                                                    textTransform: 'capitalize',
                                                                    margin: '10px 0px 0px 10px'
                                                                }}>
                                                                {food.foodName}
                                                            </Typography>
                                                            <Typography color='#2c2c2c'
                                                                sx={{
                                                                    color: '#3b4043',
                                                                    fontWeight: 500,
                                                                    fontSize: {
                                                                        small: '10px',
                                                                        tablet: '15px'
                                                                    },
                                                                    margin: '0px 0px 5px 10px'
                                                                }}>
                                                                by: {food.foodAuthor}
                                                            </Typography>

                                                            <Box sx={{ display: 'flex' }}>
                                                                <Rating name="read-only" value={food.rating / food.user} precision={0.2} size="small" readOnly
                                                                    sx={{
                                                                        margin: '0px 0px 10px 8px'
                                                                    }} />
                                                                <Typography
                                                                    color='#2c2c2c'
                                                                    sx={{
                                                                        color: '#3b4043',
                                                                        fontWeight: 500,
                                                                        fontSize: {
                                                                            small: '8px',
                                                                            tablet: '13px'
                                                                        },
                                                                        margin: '0px 0px 5px 5px'
                                                                    }}>
                                                                    ({food.user} User Rated)
                                                                </Typography>
                                                            </Box>
                                                        </NavLink>
                                                    }
                                                </Grid>
                                            ))}
                                </Grid>
                            </Box>
                        </motion.div>
                    </Box>

                    <motion.div animate={{ y: 0 }} initial={{ y: 1000 }} transition={{ duration: 0.5 }}>
                        {
                            showCategories ?
                                <Box sx={{
                                    display: 'flex',
                                    textAlign: 'center',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Button onClick={showLess}
                                        sx={{
                                            backgroundColor: '#C70000',
                                            color: 'white',
                                            padding: '10px',
                                            '&:hover': {
                                                backgroundColor: '#3b4043',
                                                color: 'white',
                                            },
                                        }}
                                    >
                                        Hide Food Categories
                                    </Button>
                                </Box>
                                :
                                <Box sx={{
                                    display: 'flex',
                                    textAlign: 'center',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Button onClick={showMore}
                                        sx={{
                                            backgroundColor: '#01937c',
                                            color: 'white',
                                            padding: '10px',
                                            marginBottom: '30px',
                                            '&:hover': {
                                                backgroundColor: '#3b4043',
                                                color: 'white',
                                            },
                                        }}>
                                        Show Food Categories
                                    </Button>
                                </Box>

                        }
                    </motion.div>

                    {
                        showCategories ?
                            <Box>

                                { /* Main Dish */}

                                <MainDish />

                                { /* Dessert */}

                                <Dessert />

                                { /* Appetizers */}

                                <Appetizers />


                                { /* Beverages */}

                                <Beverages />

                            </Box>
                            :
                            ""
                    }

                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={open}>
                            <Box sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: {
                                    small: 'auto',
                                    laptop: 350
                                },
                                bgcolor: 'background.paper',
                                boxShadow: 24,
                                p: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                itemsAlign: 'center',
                                justifyContent: 'center',
                                textAlign: 'center'
                            }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Box>
                                        <Link to='/'>
                                            <img src={logo} alt='recipe-logo' className='logo-modal' />
                                        </Link>
                                    </Box>
                                    <Button variant="contained" onClick={() => navigate('/create')}
                                        sx={{
                                            backgroundColor: '#01937c',
                                            marginBottom: '10px',
                                            padding: '10px'
                                        }}>
                                        Create Recipe
                                    </Button>

                                    <Button variant="contained" onClick={() => navigate(`/myprofile/${userInfo.googleId}`)}
                                        sx={{
                                            backgroundColor: '#01937c',
                                            marginBottom: '10px',
                                            padding: '10px'
                                        }}>
                                        My Profile
                                    </Button>


                                    <GoogleLogout
                                        clientId={clientId}
                                        buttonText="Logout"
                                        onLogoutSuccess={onSuccessLogout}
                                        theme="filled_blue"
                                        render={(renderProps) => (
                                            <Button onClick={renderProps.onClick} variant="contained"
                                                className='button-login'
                                                sx={{
                                                    backgroundColor: '#01937c',
                                                    padding: '10px'
                                                }}>
                                                Logout
                                            </Button>
                                        )}
                                    />

                                    <Typography sx={{ margin: '30px 0px 0px 0px' }}>
                                        For more information, kindly email me on my personal website -
                                        <a href='https://marklestermoreno.vercel.app/'
                                            // eslint-disable-next-line
                                            className='link-website' target="_blank" rel="noreferrer">
                                            @MarkLesterMoreno
                                        </a>
                                    </Typography>
                                </Box>
                            </Box>
                        </Fade>
                    </Modal>
                </Responsive>
            </ThemeProvider>

            { /* Modal */}


        </>
    )
}

export default Home