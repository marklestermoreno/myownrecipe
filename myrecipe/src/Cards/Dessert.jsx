import React, { useState } from 'react'

import { NavLink } from 'react-router-dom'

// Material UI
import { Typography, Box, Grid, Pagination, CardMedia, Rating, Skeleton } from "@mui/material";

import usePagination from "../Home/home";

// Context 
import { useRecipeContext } from '../context/recipeContext';

import { motion } from 'framer-motion'

const Dessert = () => {

    const { data, loading } = useRecipeContext()

    // Sorting Desserts

    const [dessertDish, setDessertDish] = useState(data)
    const [dessertOrder, setDessertOrder] = useState('asc')

    const dessertSorting = (col) => {
        if (dessertOrder === 'asc') {
            const sorted = [...data].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
            );
            setDessertDish(sorted);
            setDessertOrder("dsc")

        }
        if (dessertOrder === 'dsc') {
            const sorted = [...data].sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
            );
            setDessertDish(sorted);
            setDessertOrder("asc")
        }
    }

    const dessertSortingRating = (rating, user) => {
        if (dessertOrder === 'asc') {
            const sorted = [...data].sort((a, b) =>
                a[rating] / a[user] > b[rating] / b[user] ? 1 : -1
            );
            setDessertDish(sorted);
            setDessertOrder("dsc")

        }
        if (dessertOrder === 'dsc') {
            const sorted = [...data].sort((a, b) =>
                a[rating] / a[user] > b[rating] / b[user] ? -1 : 1
            );
            setDessertDish(sorted);
            setDessertOrder("asc")
        }
    }


    // Pagination Dessert

    let [pageDessert, setPageDessert] = useState(1);
    const PER_PAGEDessert = 12;

    const countDessert = Math.ceil(dessertDish.length / PER_PAGEDessert);
    const _DATADessert = usePagination(dessertDish, PER_PAGEDessert);

    const handleChangeDessert = (e, p) => {
        setPageDessert(p);
        _DATADessert.jump(p);
    };


    return (
        <>
            <motion.div animate={{ x: 0 }} initial={{ x: 1000 }} transition={{ duration: 0.5 }}>
                <Box sx={{
                    flexDirection: {
                        small: 'column',
                    },
                    margin: {
                        small: '30px 40px',
                        tablet: '60px 110px'
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
                        }}> Dessert
                    </Typography>

                    <Box sx={{ margin: '10px 0px' }}>
                        <button onClick={() => dessertSorting('foodName')} className='sort-name'>
                            Sort by Name
                        </button>

                        <button onClick={() => dessertSortingRating('rating', 'user')} className='sort-rate'>
                            Sort by Rate
                        </button>

                        <button onClick={() => dessertSorting('categories')} className='sort-rate'>
                            Sort by Categories
                        </button>

                        <button onClick={() => dessertSorting('createdAt')} className='sort-rate'>
                            Date Created
                        </button>
                    </Box>


                    <Box sx={{ margin: '30px 0px' }} >
                        <Grid container direction='row' spacing={3}>
                            {
                                _DATADessert.currentData().map((food) => (
                                    food.classification === 'dessert' && food.approved === true ?
                                        <Grid item small={20} tablet={20} laptop={6} desktop={4} up={3} max={1} key={food._id} className='cards'>
                                            {loading ?
                                                <Skeleton variant="rectangular" height={200} animation="wave" />
                                                :
                                                <NavLink to={`/${food.classification}/${food._id}/${food.userId}`} className='cards-destination'>
                                                    <CardMedia
                                                        component="img"
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
                                                            margin: '10px 0px 0px 10px',
                                                            textTransform: 'capitalize'
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
                                                            margin: '0px 0px 5px 10px',
                                                            textTransform: 'capitalize'
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
                                                                margin: '0px 0px 5px 5px',
                                                            }}>
                                                            ({food.user} User Rated)
                                                        </Typography>
                                                    </Box>
                                                </NavLink>
                                            }
                                        </Grid>
                                        : ""
                                ))}
                        </Grid>

                    </Box>
                    <Pagination count={countDessert} page={pageDessert} onChange={handleChangeDessert} />
                </Box>
            </motion.div>
        </>
    )
}

export default Dessert