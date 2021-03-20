import React from 'react';
import {Grid, makeStyles, Typography} from "@material-ui/core";
import {Rating} from "@material-ui/lab";

const useStyles = makeStyles(theme => ({
    rating: {
        width: '350px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        margin: '30px 0'
    },
    grid: {
        borderBottom: '1px solid #000',
        paddingBottom: '30px'
    }
}));

const RatingItem = ({institution}) => {
    const classes = useStyles();
    return (
        <>
            {institution && <Grid className={classes.grid}>
                <Typography
                    variant='h5'
                    component='h5'
                    className={classes.title}
                    align='center'
                >
                    Рейтинг
                </Typography>
                <Typography
                    variant='body1'
                    component='p'
                    className={classes.rating}
                >
                    Общий рейтинг:
                    <Rating
                        name='half-rating'
                        precision={0.5}
                        defaultValue={Math.round(+institution.allRating)}
                        readOnly
                    />
                    <span>({institution?.allRating})</span>
                </Typography>
                <Typography
                    variant='body1'
                    component='p'
                    className={classes.rating}
                >
                    Рейтинг кухни: <Rating
                    name='half-rating'
                    precision={0.5}
                    defaultValue={Math.round(+institution.foodRating)}
                    readOnly
                />
                    <span>({institution?.foodRating})</span>
                </Typography>
                <Typography
                    variant='body1'
                    component='p'
                    className={classes.rating}
                >
                    Рейтинг сервиса: <Rating
                    name='half-rating'
                    precision={0.5}
                    defaultValue={Math.round(+institution.serviceRating)}
                    readOnly
                />
                    <span>({institution?.serviceRating})</span>
                </Typography>
                <Typography
                    variant='body1'
                    component='p'
                    className={classes.rating}
                >
                    Рейтинг интерьера: <Rating
                    name='half-rating'
                    precision={0.5}
                    defaultValue={Math.round(+institution?.interiorRating)}
                    readOnly
                />
                    <span>({institution?.interiorRating})</span>
                </Typography>
            </Grid>}
        </>
    );
};

export default RatingItem;