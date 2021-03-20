import React from 'react';
import {Grid, makeStyles, Typography} from "@material-ui/core";
import {urlApi} from "../../../utils/constants";
import { Rating } from '@material-ui/lab';
import imagePlaceholder from '../../../assets/images/image-placeholder-350x350.png';
import {Link} from "react-router-dom";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles(theme => ({
    instImgBox: {

    },
    instImg: {
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
        display: 'block'
    },
    instTitle: {

    },
    gridItem: {
        marginRight: theme.spacing(3),
        textAlign: 'center'
    },
    itemInner: {
        color: '#000',
        textDecoration: 'none'
    },
    photosCount: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}))

const InstitutionItem = ({title, image, allRating, id, rateCount, imagesCount}) => {
    const classes = useStyles();
    const imageUrl = image ? `${urlApi}/uploads/${image}` : imagePlaceholder;
    return (
        <Grid
            item
            className={classes.gridItem}
            xs={12}
            sm={6}
            md={4}
        >
            <Link
                to={`/full/${id}`}
                className={classes.itemInner}
            >
                <Grid
                    className={classes.instImgBox}
                >
                    <img
                        src={imageUrl}
                        alt={title}
                        className={classes.instImg}
                    />
                </Grid>
                <Typography
                    variant='h6'
                    component='h6'
                    align='center'
                    className={classes.instTitle}
                >
                    {title}
                </Typography>
                <Rating
                    name='half-rating'
                    precision={0.5}
                    defaultValue={Math.round(+allRating)}
                    readOnly
                />
                <Typography

                >({allRating}, {rateCount} отзывов)</Typography>
                <Typography
                    className={classes.photosCount}
                >
                    <PhotoCameraIcon /> <span style={{marginLeft: '10px'}} >{imagesCount} фотографий</span>
                </Typography>
            </Link>
        </Grid>
    );
};

export default InstitutionItem;