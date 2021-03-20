import React from 'react';
import {Grid, makeStyles, Typography} from "@material-ui/core";
import ReviewItem from "./ReviewItem/ReviewItem";

const useStyles = makeStyles(theme => ({
    title: {
        margin: '30px 0'
    },
    grid: {
        borderBottom: '1px solid #000',
        paddingBottom: '30px',
        marginBottom: '20px'
    }
}))

const ReviewItems = ({reviews, reviewsErrors}) => {
    const classes = useStyles();
    return (
        <>
            <Grid className={classes.grid}>
                <Typography
                    variant='h5'
                    component='h5'
                    className={classes.title}
                >
                    Отзывы
                </Typography>
                {!reviewsErrors ? <Grid>
                    {reviews && reviews.map(review => <ReviewItem key={review._id} review={review}/>)}
                </Grid> : <p style={{textAlign: 'center'}} >{reviewsErrors?.error}</p>}
            </Grid>
        </>
    );
};

export default ReviewItems;