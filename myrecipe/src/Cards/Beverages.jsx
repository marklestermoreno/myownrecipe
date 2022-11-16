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

    // Sorting Beverages

    const [beveragesDish, setBeveragesDish] = useState(data)
    const [beveragesOrder, setBeveragesOrder] = useState('asc')

    const beveragesSorting = (col) => {
        if (beveragesOrder === 'asc') {
            const sorted = [...data].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
            );
            setBeveragesDish(sorted);
            setBeveragesOrder("dsc")

        }
        if (beveragesOrder === 'dsc') {
            const sorted = [...data].sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
            );
            setBeveragesDish(sorted);
            setBeveragesOrder("asc")
        }
    }

    const beveragesSortingRating = (rating, user) => {
        if (beveragesOrder === 'asc') {
            const sorted = [...data].sort((a, b) =>
                a[rating] / a[user] > b[rating] / b[user] ? 1 : -1
            );
            setBeveragesDish(sorted);
            setBeveragesOrder("dsc")

        }
        if (beveragesOrder === 'dsc') {
            const sorted = [...data].sort((a, b) =>
                a[rating] / a[user] > b[rating] / b[user] ? -1 : 1
            );
            setBeveragesDish(sorted);
            setBeveragesOrder("asc")
        }
    }

    // Pagination Bevarages

    let [pageBeverages, setPageBeverages] = useState(1);
    const PER_PAGEBeverages = 12;

    const countBeverages = Math.ceil(beveragesDish.length / PER_PAGEBeverages);
    const _DATABeverages = usePagination(beveragesDish, PER_PAGEBeverages);

    const handleChangeBeverages = (e, p) => {
        setPageBeverages(p);
        _DATABeverages.jump(p);
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
                        }}> Beverages
                    </Typography>

                    <Box sx={{ margin: '10px 0px' }}>
                        <button onClick={() => beveragesSorting('foodName')} className='sort-name'>
                            Sort by Name
                        </button>

                        <button onClick={() => beveragesSortingRating('rating', 'user')} className='sort-rate'>
                            Sort by Rate
                        </button>

                        <button onClick={() => beveragesSorting('categories')} className='sort-rate'>
                            Sort by Categories
                        </button>

                        <button onClick={() => beveragesSorting('createdAt')} className='sort-rate'>
                            Date Created
                        </button>
                    </Box>


                    <Box sx={{ margin: '30px 0px' }} >
                        <Grid container direction='row' spacing={3}>
                            {
                                _DATABeverages.currentData().map((food) => (
                                    food.classification === 'beverages' && food.approved === true ?
                                        <Grid item small={20} tablet={20} laptop={6} desktop={4} up={3} max={1} key={food._id} className='cards'>
                                            {loading ?
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
                                                                margin: '0px 0px 5px 5px'
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
                    <Pagination count={countBeverages} page={pageBeverages} onChange={handleChangeBeverages} />
                </Box>
            </motion.div>
        </>
    )
}

export default Dessert