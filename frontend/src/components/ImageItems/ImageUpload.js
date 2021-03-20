import React from 'react';
import {Button, Grid, makeStyles, Typography} from "@material-ui/core";
import PropTypes from 'prop-types';
import FormElement from "../UI/FormElement/FormElement";

const useStyles = makeStyles(theme => ({
    grid: {
        margin: '40px 0',
        borderTop: '1px solid #000'
    },
    title: {
        margin: '20px 0'
    }
}))

const ImageUpload = ({onChangeImage, onSubmit, image, error}) => {
    const classes = useStyles();
    return (
        <>
            <Grid className={classes.grid}>
                <Typography variant='h5' component='h5' align='center' className={classes.title}>Загрузить фотографию</Typography>
                <form onSubmit={onSubmit}>
                    <FormElement
                        label='Добавить новое фото'
                        changedFile={onChangeImage}
                        name='image'
                        id='image-inp'
                        value={image}
                        error={error('image')}
                        type='file'
                    />
                    <Button variant='contained' type='submit'>Отправить</Button>
                </form>
            </Grid>
        </>
    );
};

ImageUpload.propTypes = {
    onChangeImage: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    image: PropTypes.any.isRequired,
    error: PropTypes.func.isRequired
}

export default ImageUpload;