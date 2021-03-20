import React from 'react';
import {Grid, makeStyles, Typography} from "@material-ui/core";
import Moment from "react-moment";
import {Rating} from "@material-ui/lab";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {deleteReview} from "../../../store/actions/reviewsActions";

const useStyles = makeStyles(theme => ({
    rating: {
        width: '350px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    header: {
        width: '170px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    comment: {
        fontSize: theme.typography.pxToRem(17),
        margin: '15px 0'
    },
    grid: {
        borderTop: '1px solid #000',
        padding: '15px 0'
    }
}))

const ReviewItem = ({review}) => {
    const classes = useStyles();
    const {user} = useSelector(state => state.users);
    const dispatch = useDispatch();
    return (
        <>
            <Grid className={classes.grid}>
                {user && user.role === 'admin' &&
                <Button
                    type='button'
                    variant='contained'
                    onClick={() => dispatch(deleteReview(review._id, review.institution))}
                >
                    Удалить отзыв
                </Button>}
                <Grid className={classes.header}>
                    <Moment format='DD:MM:YYYY HH:mm' >{review.createDate}</Moment>
                    <Typography variant='h6' component='h6'>{review.user.username}</Typography>
                </Grid>
                <Typography variant='body1' component='p' className={classes.comment}>{review.comment}</Typography>
                <Typography
                    variant='body1'
                    component='p'
                    className={classes.rating}
                >
                    Рейтинг кухни: <Rating
                    name='half-rating'
                    precision={0.5}
                    defaultValue={Math.round(+review.foodRating)}
                    readOnly
                />
                    <span>({review.foodRating})</span>
                </Typography>
                <Typography
                    variant='body1'
                    component='p'
                    className={classes.rating}
                >
                    Рейтинг сервиса: <Rating
                    name='half-rating'
                    precision={0.5}
                    defaultValue={Math.round(+review.serviceRating)}
                    readOnly
                />
                    <span>({review.serviceRating})</span>
                </Typography>
                <Typography
                    variant='body1'
                    component='p'
                    className={classes.rating}
                >
                    Рейтинг интерьера: <Rating
                    name='half-rating'
                    precision={0.5}
                    defaultValue={Math.round(+review.interiorRating)}
                    readOnly
                />
                    <span>({review.interiorRating})</span>
                </Typography>
            </Grid>
        </>
    );
};

export default ReviewItem;