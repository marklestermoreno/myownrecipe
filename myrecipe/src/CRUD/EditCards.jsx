import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

import {
  Box, TextField, Grid, Button, TextareaAutosize, Stack,
  RadioGroup, Radio, FormControlLabel, Select, MenuItem, FormLabel,
} from '@mui/material';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';

import MuiAlert from '@mui/material/Alert';
import FileInputUpdate from '../FileInput/FileInputUpdate';

import './update.scss'

// Recipe Context
import { useRecipeContext } from '../context/recipeContext'

const EditCards = ({ food }) => {

  const { id } = useParams()
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const { message, setMessage,
    loading, handleUpdate } = useRecipeContext()

  const [update, setUpdate] = useState({
    foodId: food.foodId,
    email: food.email,
    foodName: food.foodName,
    foodAuthor: food.foodAuthor,
    classification: food.classification,
    categories: food.categories,
    difficulty: food.difficulty,
    time: food.time,
    yields: food.yields,
    rating: food.rating,
    user: food.user,
    ingredients: food.ingredients,
    steps: food.steps,
    image: food.image,
    approved: false
  })

  const [text, setText] = useState("")


  const handleChange = (e) => {
    setUpdate({ ...update, categories: e.target.value })
  };

  // Handle Ingredients

  const handleIngredients = (e, i) => {
    const stepsClone = [...update.ingredients]
    stepsClone[i] = e.target.value
    setUpdate({
      ...update,
      ingredients: stepsClone
    })
  }

  const handleIngredientsCount = () => {
    setUpdate({
      ...update,
      ingredients: [...update.ingredients, ""]
    })

  }

  const removeIngredients = i => {
    update.ingredients.pop(i, 1);
    setUpdate({
      ...update, ingredients: update.ingredients
    })
  }

  // Handle Steps

  const handleSteps = (e, i) => {
    const stepsClone = [...update.steps]
    stepsClone[i] = e.target.value
    setUpdate({
      ...update,
      steps: stepsClone
    })
  }

  const handleStepsCount = () => {
    setUpdate({
      ...update,
      steps: [...update.steps, ""]
    })

  }

  const deleteSteps = i => {
    const deleteList = [...update.steps]
    deleteList.pop(i, 1)
    setUpdate({
      ...update,
      steps: deleteList
    })
  }
  // Handle Input

  const handleInputState = (value) => {
    setUpdate((prev) => ({ ...prev, image: value }))
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <>

      <Box
        noValidate
        autoComplete="off">
        <Button sx={{ color: 'white', backgroundColor: '#01937c' }} onClick={handleClickOpen} variant='contained'>
          <EditIcon />
        </Button>
        <Dialog
          open={open}
          scroll='body'
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title"
            sx={{
              color: '#01937c',
              margin: {
                small: '0px',
                mobile: '10px 0px 2px 0px',
                tablet: '20px 0px 5px 10px'
              }
            }}>
            {"Update Food Recipe"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" sx={{ margin: '12px' }}>
              Updating your recipe will require admin approval, thus your food recipes will not appear for a moment until the admin authorizes it. <br /> Thank you!  Type <span style={{ color: '#01937c' }}> {food.foodName} </span> to enable update button
            </DialogContentText>
            <DialogContentText id="alert-dialog-description" sx={{ margin: '20px 0px' }}>

              <Box sx=
                {{
                  margin: {
                    small: '2px',
                    mobile: '2px',
                    tablet: '15px'
                  }
                }}
              >

                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  value={update.foodName}
                  label='Food Name'
                  fullWidth
                  error={message === 'errorFoodName'}
                  helperText={
                    message === 'errorFoodName' ? "(Required)" : ""
                  }
                  disabled={loading}
                  onChange={
                    function handleFunctions(e) {
                      setUpdate({ ...update, foodName: e.target.value });
                      setMessage("")
                    }}
                  sx={{
                    "& .MuiInputLabel-root.Mui-focused": { color: '#01937c' },//styles the label
                    "& .MuiOutlinedInput-root.Mui-focused": {
                      "& > fieldset": {
                        borderColor: "#01937c"
                      }
                    },
                    margin: '10px 0px'
                  }}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  value={update.foodAuthor}
                  label='Food Author'
                  fullWidth
                  error={message === 'errorFoodAuthor'}
                  helperText={
                    message === 'errorFoodAuthor' ? "(Required)" : ""
                  }
                  disabled={loading}
                  onChange={
                    function handleFunctions(e) {
                      setUpdate({ ...update, foodAuthor: e.target.value });
                      setMessage("")
                    }}
                  sx={{
                    "& .MuiInputLabel-root.Mui-focused": { color: '#01937c' },//styles the label
                    "& .MuiOutlinedInput-root.Mui-focused": {
                      "& > fieldset": {
                        borderColor: "#01937c"
                      }
                    },
                    margin: '10px 0px'
                  }}
                />
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
                    defaultValue={food.classification}
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
                          setUpdate({ ...update, classification: e.target.value });
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
                {   /* eslint-disable-next-line */}
                {update.classification === 'main-dish' ?
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
                            mobile: '350px',
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
                  /* eslint-disable-next-line */
                  update.classification === 'dessert' ?
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
                              mobile: '350px',
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
                    /* eslint-disable-next-line */
                    update.classification === 'beverages' ?
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
                                mobile: '350px',
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
                        /* eslint-disable-next-line */
                      update.classification === 'appetizers' ?
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
                                  mobile: '350px',
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

                { /* Food Difficulties */}
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
                        small: '20px'
                      }
                    }}
                  >
                    Food Difficulty </FormLabel>
                  <RadioGroup
                    defaultValue={food.difficulty}
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
                          setUpdate({ ...update, difficulty: e.target.value })
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
                          tablet: '10px'
                        },
                        paddingRight: '12px',
                        color: '#3b4043',
                        fontWeight: '500',
                        paddingBottom: { small: '15px' }
                      }}
                    >
                      Servings  </FormLabel>
                    <TextField id="outlined-search"
                      label="Servings"
                      type="number"
                      disabled={loading}
                      value={update.yields}
                      error={message === 'errorYields'}
                      helperText={
                        message === 'errorTime' ? "Invalid Servings" : ""
                      }
                      required
                      size='small'
                      onChange={
                        function handleFunctions(e) {
                          setUpdate({ ...update, yields: e.target.value })
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
                            mobile: '90%',

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
                          tablet: '10px'
                        },
                        paddingRight: '12px',
                        color: '#3b4043',
                        fontWeight: '500',
                        paddingBottom: { small: '15px' }
                      }}
                    >
                      Time Preparation </FormLabel>
                    <TextField id="outlined-search"
                      label="Minutes"
                      type="number"
                      disabled={loading}
                      value={update.time}
                      error={message === 'errorTime'}
                      helperText={
                        message === 'errorTime' ? "Invalid Time" : ""
                      }
                      required
                      size='small'
                      onChange={
                        function handleFunctions(e) {
                          setUpdate({ ...update, time: e.target.value })
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
                            mobile: '90%',

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
                    },
                  }}>

                    <FormLabel
                      sx={{
                        paddingTop: {
                          small: '0px',
                          tablet: '10px'
                        },
                        paddingRight: '12px',
                        color: '#3b4043',
                        fontWeight: '500',
                        paddingBottom: { small: '15px' }
                      }}
                    >
                      Ingredients </FormLabel>
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}>
                      {update.ingredients.map((ing, i) => (
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
                                  tablet: '455px',
                                  laptop: '555px',
                                  desktop: '655px',
                                  max: '230px'
                                },

                              }
                            }}
                          />
                          <br />
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
                      {update.steps.map((step, i) => (
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
                      <FileInputUpdate
                        name='image'
                        type='image'
                        update={update}
                        food={food}
                        message={message}
                        handleInputState={handleInputState}
                        value={update.image}
                      />

                    </Box>
                  </Box>
                </Box>
              </Box>

              <TextField
                autoFocus
                margin="dense"
                id="name"
                label={`Type ${food.foodName} to continue`}
                fullWidth
                onChange={e => setText(e.target.value)}
                sx={{
                  "& .MuiInputLabel-root.Mui-focused": { color: '#01937c' },//styles the label
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    "& > fieldset": {
                      borderColor: "#01937c"
                    }
                  },
                }}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ margin: '12px' }}>
            <Button onClick={handleClose} variant="contained"
              sx={{
                color: '#01937c',
                backgroundColor: 'transparent',
                '&:hover': {
                  backgroundColor: '#01937c',
                  color: 'white',
                },
              }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              disabled={food.foodName !== text}
              onClick={() => handleUpdate(id, update)}
              autoFocus
              sx={{
                color: 'white',
                backgroundColor: '#01937c',
                '&:hover': {
                  backgroundColor: '#ef4444',
                  color: 'white',
                },
              }}>
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  )
}

export default EditCards