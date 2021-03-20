import React from 'react';
import {urlApi} from "../../../utils/constants";
import {Grid, makeStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {deleteImage} from "../../../store/actions/imagesActions";

const useStyles = makeStyles(theme => ({
    photoBoxItem: {
        width: '250px'
    },
    img: {
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
        display: 'block'
    },
}))

const ImageItem = ({image, id, idInst}) => {
    const classes = useStyles();
    const {user} = useSelector(state => state.users);
    const dispatch = useDispatch();
    return (
        <>
            <Grid
                className={classes.photoBoxItem}
            >
                <img
                    src={`${urlApi}/uploads/${image}`}
                    alt={id}
                    className={classes.img}
                />
                {user && user.role === 'admin' && <Button type='button' fullWidth variant='contained'
                         onClick={() => dispatch(deleteImage(id, idInst))}>Удалить</Button>}
            </Grid>
        </>
    );
};

export default ImageItem;