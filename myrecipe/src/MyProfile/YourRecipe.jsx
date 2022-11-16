import React from 'react'

import { NavLink, useParams } from 'react-router-dom'

// Material UI
import { Typography, Box, Grid, Rating, CardMedia, Skeleton } from "@mui/material";

// Context 
import { useRecipeContext } from '../context/recipeContext';

import { motion } from 'framer-motion'

const YourRecipe = () => {


    const { user, loading, data } = useRecipeContext()
    const { userId } = useParams()

    return (
        <>
            <motion.div animate={{ y: 0 }} initial={{ y: 1000 }} transition={{ duration: 0.75 }}>
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
                        }}> Your Recipe
                    </Typography>


                    <Box sx={{ margin: '30px 0px' }} >
                        {
                            user.map((food) => (
                                food?.userId === userId ?
                                    <Grid container direction='row' spacing={3} >
                                        {
                                            data.filter((user) => user.userId.includes(food.userId)).sort((a, b) => a.updatedAt > b.updatedAt ? -1 : 1).map((food) => (
                                                <Grid item small={20} tablet={20} laptop={6} desktop={4} up={3} max={1} key={food._id} className='cards'>
                                                    {loading ?
                                                        <Skeleton variant="rectangular" height={200} animation="wave" />
                                                        :
                                                        <NavLink to={`/${food.classification}/${food._id}/${food.userId}`} className='cards-destination'>
                                                            <Box
                                                                sx={{
                                                                    borderRadius: '100px'
                                                                }}>
                                                                {
                                                                    food.approved === false ?
                                                                        <Typography sx={{
                                                                            color: 'white',
                                                                            borderTopLeftRadius: '5px',
                                                                            borderTopRightRadius: '5px',
                                                                            backgroundColor: '#ef4444',
                                                                            padding: '10px 5px',
                                                                            fontWeight: '500',
                                                                            textAlign: 'center'
                                                                        }}> Recipe Pending </Typography>
                                                                        :
                                                                        <Typography sx={{
                                                                            color: 'white',
                                                                            borderTopLeftRadius: '5px',
                                                                            borderTopRightRadius: '5px',
                                                                            backgroundColor: '#01937c',
                                                                            padding: '10px 5px',
                                                                            fontWeight: '500',
                                                                            textAlign: 'center'
                                                                        }}> Recipe Posted </Typography>
                                                                }
                                                            </Box>
                                                            <CardMedia
                                                                component="img"
                                                                alt="recipe"
                                                                height="170"
                                                                image={food.image}
                                                                sx={{
                                                                    borderRadiusDownLeft: '10px',
                                                                    borderRadiusDownRight: '10px'
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

                                            ))
                                        }
                                    </Grid>
                                    :
                                    ""
                            ))}
                    </Box>
                </Box>
            </motion.div>
        </>
    )
}

export default YourRecipe