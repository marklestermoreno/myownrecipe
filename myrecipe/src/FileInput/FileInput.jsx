import React, { useState, useEffect } from 'react'

import { Box, Button, LinearProgress, Stack } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../firebase";

import './file.scss'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const FileInput = ({ value, handleInputState, food, message }) => {

    const [progress, setProgress] = useState(0);
    const [progressShow, ] = useState(false);

    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);


    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
        }

    }, [selectedImage]);


    const handleUpload = (e) => {
        e.preventDefault()
        setProgress(true);
        const storageRef = ref(
            storage,
            food.classification === "main-dish" ? `${food.foodId}` :
                food.classification === "dessert" ? `${food.foodId}` :
                    food.classification === "beverages" ? `${food.foodId}` :
                        food.classification === "appetizers" ? `${food.foodId}` :
                            `${food.foodId}`

        )
        const uploadTask = uploadBytesResumable(storageRef, selectedImage);
        uploadTask.on(
            "state_changed",
            (snapshot) => {

                const uploaded = Math.floor(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(uploaded)
            },
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    handleInputState(url)
                    console.log(url)
                })
            }
        )
    }

    return (
        <>
            { /* Image */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                margin: {
                    desktop: '10px 280px 10px 280px',
                    laptop: '10px 180px 10px 180px',
                    tablet: '10px 80px 10px 80px',
                    small: '10px 0px 10px -10px'
                },
                padding: {
                    tablet: '0px 50px',
                    small: '0px 20px'
                },
                flexDirection: {
                    small: 'column',
                },
            }}>

                <Button variant="contained" component="label"
                    disabled={food.classification === ""}
                    sx={{
                        background: '#01937c',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'white',
                            borderColor: '#01937c',
                            color: '#3b4043'
                        },
                        width: {
                            small: '90%',
                            mobile: '100%',
                        }
                        ,
                        marginBottom: {
                            small: '10px',
                            tablet: '10px'
                        }
                    }}>
                    Select Food Image
                    <input
                        hidden
                        onChange={(e) => handleInputState(setSelectedImage(e.target.files[0]))}
                        accept="image/*"
                        type="file"
                    />
                </Button>
            </Box>


            {
                imageUrl && selectedImage && (
                    <Box mt={2} mb={2} textAlign="center">
                        <img src={imageUrl} alt={selectedImage.name} className='image-preview' />
                    </Box>
                )
            }


            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                textAlign: 'center',
                alignContent: 'center',
                margin: {
                    desktop: '5px 280px 10px 280px',
                    laptop: '5px 180px 10px 180px',
                    tablet: '5px 80px 10px 80px',
                    small: '5px 0px 10px -10px'
                },
                padding: {
                    tablet: '0px 50px',
                    small: '0px 20px'
                },
                flexDirection: {
                    small: 'column',
                },
            }}>
                {progress < 100 && (
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress variant="determinate" value={progress}
                            sx={{
                                width: {
                                    small: '90%',
                                    mobile: '100%',
                                }
                            }} />
                    </Box>
                )}

                {progress === 100 && (
                    <Box>
                        <LinearProgress variant="determinate" value={progress}
                            sx={{
                                width: {
                                    small: '90%',
                                    mobile: '100%',
                                }
                            }} />
                    </Box>
                )}

                {progress === 100 && (
                    <Box>
                        <h1 className='image-progress'> Image Uploaded </h1>
                    </Box>
                )}

                {message === 'errorImage' && (food.image === '' || progress !== 100) ?
                    <Stack spacing={2} mt={2}>
                        <Alert severity="error"> Image Required or Upload Button </Alert>
                    </Stack>
                    :
                    ""
                }

                {value !== null && !progressShow && typeof value !== "string" && (
                    <Button onClick={handleUpload} variant="contained"
                        sx={{
                            background: '#01937c',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'white',
                                borderColor: '#01937c',
                                color: '#3b4043'
                            },
                            width: '100%',
                            marginBottom: {
                                small: '10px',
                                tablet: '10px'
                            },
                            marginTop: {
                                small: '50px'
                            }
                        }}>
                        Upload Image
                    </Button>
                )}
            </Box>
        </>
    )
}

export default FileInput