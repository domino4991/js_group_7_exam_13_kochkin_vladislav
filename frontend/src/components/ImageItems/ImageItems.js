import React from 'react';
import {Grid, makeStyles, Typography} from "@material-ui/core";
import ImageItem from "./ImageItem/ImageItem";

const useStyles = makeStyles(theme => ({
    photosBox: {
        display: 'flex',
        flexWrap: 'wrap',
        borderBottom: '1px solid #000',
        paddingBottom: '30px'
    },
}));

const ImageItems = ({images, imagesErrors}) => {
    const classes = useStyles();
    return (
        <>
            <Typography
                variant='h5'
                component='h5'
                align='center'
                gutterBottom
            >Галерея</Typography>
            {!imagesErrors ? <Grid
                item
                className={classes.photosBox}
            >
                {images && images.map(image => <ImageItem
                    key={image._id}
                    image={image.image}
                    id={image._id}
                    idInst={image.institution}
                />)}
            </Grid> : <p style={{textAlign: 'center'}}>{imagesErrors?.error}</p>}
        </>
    );
};

export default ImageItems;