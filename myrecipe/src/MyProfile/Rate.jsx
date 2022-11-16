import React from 'react'

import { NavLink, useParams } from 'react-router-dom'

// Material UI
import { Typography, Box, Grid, Rating, CardMedia, Skeleton } from "@mui/material";

import { MoonLoader } from 'react-spinners'

// Context 
import { useRecipeContext } from '../context/recipeContext';

import { motion } from 'framer-motion'

const Rate = () => {


    const { user, loading, data } = useRecipeContext()
    const { userId, id } = useParams()

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
                        }}> Rated Recipe
                    </Typography>


                    <Box sx={{ margin: '30px 0px' }} >
                        {
                            user.map((food) => (
                                food?.userId === userId ?
                                    food.rated.length !== 0 ?
                                        <Grid container direction='row' spacing={3} >
                                            {
                                                food.rated.sort((a, b) => a > b ? -1 : 1).map((rated) => (
                                                    food.rating === id ?
                                                        data.map((food) => (
                                                            rated === food._id ?
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
                                                        :
                                                        ''

                                                ))
                                            }
                                        </Grid>
                                        :
                                        <>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    flexDirection: 'column',
                                                    itemsAlign: 'center',
                                                    textCenter: 'center',
                                                    alignItems: "center",
                                                    marginTop: '75px'
                                                }}>
                                                <MoonLoader color='#01937c' size={100} speedMultiplier={0.5} />
                                                <Typography
                                                    sx={{
                                                        color: '#3b4043',
                                                        fontSize: {
                                                            small: '15px',
                                                            mobile: '20px',
                                                            tablet: '25px'
                                                        },
                                                        marginTop: '20px',
                                                        fontWeight: '450'
                                                    }}> No Data Available </Typography>
                                            </Box>
                                        </>
                                    :
                                    ''
                            ))}
                    </Box>
                </Box>
            </motion.div>
        </>
    )
}

export default Rate