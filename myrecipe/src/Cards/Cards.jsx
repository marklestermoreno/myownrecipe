import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

// Material UI
import {
  Box, Typography, ThemeProvider, CardMedia,
  Button, Avatar, Modal, Backdrop, Fade
} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

// Framer Motion
import { motion, useScroll, useSpring } from "framer-motion";


// Misc
import { theme } from '../responsive.js'
import { Responsive } from '../Home/home.js';
import './Cards.scss'
import { StyledRating } from './cards.js'
// import { jsPDF } from "jspdf";

// Context 
import { useRecipeContext } from '../context/recipeContext';

// CRUD
import DeleteCards from '../CRUD/DeleteCards';
import EditCards from '../CRUD/EditCards';
import RequestCards from '../MyProfile/RequestCards'

const Cards = () => {

  const { data, user, handleRate, alert, closeAlert, handleSaved, closeAlert2, alert2, } = useRecipeContext()
  let { id } = useParams();
  const userInfo = JSON.parse(localStorage.getItem('user'));

  const navigate = useNavigate()

  // Rate
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const labels = {
    0.5: 'Useless',
    1: 'Unsatisfied',
    1.5: 'Poor',
    2: 'Somewhat Satisfied',
    2.5: 'Ok',
    3: 'Satisfied',
    3.5: 'Good',
    4: 'Very Satisfied',
    4.5: 'Excellent',
    5: 'Extremely Satisfied',
  };

  const [value, setValue] = React.useState(5);
  const [hover, setHover] = React.useState(-1);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>

      {
        data.map((food) => (
          <>
            {food._id === id ?
              <ThemeProvider theme={theme}>
                <Responsive>
                  <Box>
                    <motion.button whileHover={{ scale: 1.2 }}
                      onHoverStart={e => { }}
                      onHoverEnd={e => { }}
                      onClick={() => navigate('/')}
                      className='home-button'>
                      Return
                    </motion.button>
                  </Box>
                  <motion.div className="progress-bar" style={{ scaleX }} />
                  <Box className='card-details' key={food._id} sx={{
                    flexDirection: {
                      small: 'column'
                    },

                    margin: {
                      small: '70px 40px',
                      tablet: '110px 100px',
                      laptop: '100px 100px',
                      desktop: '100px 100px',

                    }

                  }}>

                    {/* Rated */}

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
                        Food Rated
                      </Alert>
                    </Snackbar>

                    <Snackbar open={alert2} autoHideDuration={5000} onClose={closeAlert}
                      anchorOrigin=
                      {{
                        horizontal: 'right',
                        vertical: 'top'
                      }}>
                      <Alert onClose={closeAlert2} severity="success"
                        sx={{
                          width: {
                            small: '100%',
                            tablet: '30%',
                            laptop: '20%'
                          }
                        }}>
                        Food Saved
                      </Alert>
                    </Snackbar>

                    <Typography className='food-name' sx={{ textTransform: 'capitalize' }}>
                      {food.foodName}
                    </Typography>
                    <Typography className='food-author' sx={{ textTransform: 'capitalize' }}>
                      by: {food.foodAuthor}
                    </Typography>
                    <Box className='food-details'>
                      <Typography variant='h5' className='food-difficulty'>
                        Difficulty: <span className='food-difficulty-data'> {food.difficulty} </span>
                      </Typography>
                      <Typography variant='h5' className='food-time'>
                        Time: <span className='food-time-data'> {food.time} Minutes </span>
                      </Typography>
                      <Typography variant='h5' className='food-rating'>
                        Rating: <span className='food-rating-data'> {food.rating === 0 ? '0' : (food.rating / food.user).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })} ({food.user} User Rated) </span>
                      </Typography>
                      <Typography variant='h5' className='food-rating'>
                        Yields: <span className='food-rating-data'> {food.yields} Servings </span>
                      </Typography>
                    </Box>

                    <StyledRating
                      name="customized-color"
                      defaultValue={food.rating / food.user}
                      getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                      precision={0.5}
                      size='large'
                      readOnly={!userInfo?.googleId}
                      onClick={handleOpen}
                      icon={<FavoriteIcon fontSize="inherit" />}
                      emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                      sx={{ margin: '10px 0px' }}
                    />

                    {
                      user.map((single) => (
                        single?.userId === userInfo?.googleId ?
                          <Box key={single?._id} sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            margin: '20px 0px'
                          }}>
                            <Button variant='contained'
                              disabled={single?.saved?.indexOf(id) > -1}
                              onClick={() => handleSaved(id, single._id, single.saved, single)}
                              sx={{
                                backgroundColor: '#01937c',
                                color: 'white',
                                '&:hover': {
                                  backgroundColor: '#3b4043',
                                  color: 'white',
                                },
                              }}
                            >
                              {
                                single?.saved?.indexOf(id) > -1 ?
                                  'Saved Recipe ' :
                                  'Save Recipe'
                              }
                            </Button>
                          </Box>
                          :
                          ""
                      ))}

                    <Box className='card-box'

                      sx={{
                        margin: '20px 0px',
                        padding: {
                          small: '50px 20px',
                          tablet: '50px 40px',
                          laptop: '60px 50px',
                          desktop: '70px 80px',

                        }
                      }}>
                      <CardMedia
                        component="img"
                        className="food-image"
                        image={food.image}
                        alt="food-image"
                      />

                      <Box
                        sx={{
                          display: 'flex',
                          margin: '0px 0px 20px 0px'
                        }}
                      >

                        <Box sx={{
                          display: 'flex',
                          flexDirection: 'column'
                        }}>
                          {user.map((single) => (
                            food.userId === single?.userId ?
                              <Box
                                key={single._id}
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  margin: '0px 0px 30px 0px'
                                }}>
                                <Avatar
                                  alt="Mark Lester Moreno"
                                  className='avatar'
                                  src={single?.image}
                                  sx={{
                                    width: 30,
                                    height: 30,
                                  }}
                                />
                                <Box>
                                  <Typography
                                    sx={{
                                      marginLeft: '10px',
                                      fontWeight: '300',
                                      fontSize: {
                                        small: '8px',
                                        mobile: '11px'
                                      }
                                    }}>
                                    Uploaded by
                                  </Typography>
                                  <Typography
                                    sx={{
                                      marginLeft: '10px',
                                      fontWeight: '500',
                                      fontSize: {
                                        small: '12px',
                                        mobile: '15px'
                                      }
                                    }}>
                                    {single?.userName}
                                  </Typography>
                                </Box>
                              </Box>
                              :
                              <></>
                          ))}
                          {
                            userInfo?.googleId === food.userId ?
                              <Box sx={{ display: 'flex' }}>
                                <Button
                                  sx={{
                                    color: '#01937c',
                                    marginTop: '-5px',

                                  }}>
                                  <EditCards food={food} />
                                </Button>
                                <DeleteCards food={food} />
                              </Box>
                              :
                              <> </>
                          }
                          {
                            user.map((admin) => (
                              admin.userId === userInfo?.googleId && admin.type === 'admin' ?
                                <RequestCards food={food} />
                                :
                                ""
                            ))}

                        </Box>


                      </Box>
                      <Typography className='steps-title'>
                        Ingredients
                      </Typography>
                      <Typography>
                        {food.ingredients.map((steps, i) => (
                          <>
                            <Box className='ingredients-content' >
                              <Box sx={{ display: 'flex' }} key={i}>
                                <Typography className='ingredients-name'>  - </Typography>
                                <Typography className='ingredients-name'>  {" " + steps} </Typography>
                              </Box>
                            </Box>
                          </>
                        ))}

                      </Typography>
                      <Typography className='steps-title'>
                        Steps
                      </Typography>
                      <Typography>
                        {food.steps.map((steps, i) => (
                          <>
                            <Box className='steps-content' key={i}>
                              <Typography className='steps-number'> Step {i + 1} </Typography>
                              <Typography className='steps-direction'> {steps} </Typography>
                            </Box>
                          </>
                        ))}
                      </Typography>
                    </Box>
                    
                  </Box>

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
                        width: 'auto',
                        borderRadius: '10px',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        itemsAlign: 'center',
                        justifyContent: 'center',
                        textAlign: 'center'
                      }}>
                        <Box sx={{
                          display: 'flex',
                          flexDirection: 'column',

                          itemsAlign: 'center',
                          textCenter: 'center',
                          alignItems: "center",
                        }}>
                          <Box
                            noValidate
                            autoComplete="off"
                          // onSubmit={() => handleRate(id, value, user + 1)}
                          >
                            <StyledRating
                              name="customized-color"
                              value={value}
                              defaultValue={food.rating / food.user}
                              getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                              precision={0.5}
                              onChange={(event, newValue) => {
                                setValue(newValue)
                              }}
                              onChangeActive={(event, newHover) => {
                                setHover(newHover);
                              }}
                              size='large'
                              icon={<FavoriteIcon fontSize="inherit" />}
                              emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                              sx={{ margin: '10px 0px' }}
                            />
                          </Box>
                          {value !== null && (
                            <Box sx={{ fontFamily: 'helvetica', fontSize: '15px' }}>
                              {labels[hover !== -1 ? hover : value]}
                            </Box>
                          )}
                          {
                            user.map((single) => (
                              single.userId === userInfo?.googleId ?
                                <Box
                                  key={single._id}
                                  sx={{
                                    display: 'flex',
                                    marginTop: '20px'
                                  }}>

                                  <Button
                                    disabled={single.rated.indexOf(id) > -1}
                                    onClick={() => handleRate(
                                      id, // Food Id
                                      food.rating + value,
                                      food.user + 1,
                                      food, // 
                                      single._id,
                                      single.rated,
                                      single // User Info 
                                    )}
                                    variant='contained'
                                    sx={{
                                      backgroundColor: '#01937c',
                                      color: 'white',
                                      '&:hover': {
                                        backgroundColor: '#3b4043',
                                        color: 'white',
                                      }
                                    }}
                                  >
                                    {single.rated.indexOf(id) > -1
                                      ?
                                      'Rated'
                                      :
                                      'Rate Recipe'
                                    }
                                  </Button>
                                </Box>
                                :
                                ''

                            ))}
                        </Box>
                      </Box>
                    </Fade>
                  </Modal>
                </Responsive>
              </ThemeProvider>
              :
              ""
            }
          </>
        ))
      }
    </>
  )
}

export default Cards