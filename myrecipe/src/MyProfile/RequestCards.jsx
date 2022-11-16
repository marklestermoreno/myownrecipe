import React, { useState } from 'react'
import { Button, Box, TextField } from '@mui/material'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// Context 
import { useRecipeContext } from '../context/recipeContext';


const EditCards = ({ food }) => {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const { deleteRecipe, handleApproved } = useRecipeContext()
    const [deleteFood, setDeleteFood] = useState("")


    return (
        <>
            {food.approved === false ?
                <Box>
                    <Button onClick={handleClickOpen}
                        sx={{
                            color: 'white',
                            backgroundColor: '#3b4043',
                            marginTop: '10px',
                            marginLeft: '2px'
                        }}
                        variant='contained'>
                        Recipe Request
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
                                color: '#01937c'
                            }}>
                            {"Delete Food Recipe"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description" >
                                Do you really want to delete this recipe?  Type <span style={{ color: '#ef4444' }}> {food.foodName} </span> to delete
                            </DialogContentText>
                            <DialogContentText id="alert-dialog-description" sx={{ marginTop: '20px' }}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Type Food Name"
                                    fullWidth
                                    onChange={e => setDeleteFood(e.target.value)}
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
                            <Button
                                autoFocus disabled={food.foodName !== deleteFood}
                                onClick={() => deleteRecipe(food._id, food)}
                                variant="contained"
                                sx={{
                                    color: '#01937c',
                                    backgroundColor: 'transparent',
                                    '&:hover': {
                                        backgroundColor: '#01937c',
                                        color: 'white',
                                    },
                                }}>
                                Decline and Delete
                            </Button>
                            <Button
                                autoFocus disabled={food.foodName !== deleteFood}
                                variant="contained"
                                onClick={() => handleApproved(food._id, food)}
                                sx={{
                                    color: 'white',
                                    backgroundColor: '#01937c',
                                    '&:hover': {
                                        backgroundColor: '#ef4444',
                                        color: 'white',
                                    },
                                }}>
                                Accept and Post
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Box>
                :
                ""
            }

        </>
    )
}

export default EditCards