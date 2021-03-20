import React from 'react';
import {Button, Grid, makeStyles, Typography} from "@material-ui/core";
import FormElement from "../UI/FormElement/FormElement";
import {Rating} from "@material-ui/lab";
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    rating: {
        width: '350px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '15px',
    },
    gridRating: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
        alignItems: 'center'
    }
}))

const ReviewForm = ({state, error, onChangeRating, onChangeComment, onSubmit}) => {
    const classes = useStyles();
    return (
        <Grid>
            <form
                onSubmit={onSubmit}
            >
                <FormElement
                    changed={onChangeComment}
                    value={state.comment}
                    id='comment-input'
                    label='Отзыв'
                    name='comment'
                    required={false}
                    type='text'
                    error={error('comment')}
                />
                <Grid className={classes.gridRating}>
                    <Typography
                        variant='body1'
                        component='p'
                        className={classes.rating}
                    >
                        Рейтинг кухни: <Rating
                        name='foodRating'
                        value={state.foodRating}
                        onChange={onChangeRating}
                    />
                        <span>({state.foodRating})</span>
                    </Typography>
                    <Typography
                        variant='body1'
                        component='p'
                        className={classes.rating}
                    >
                        Рейтинг сервиса: <Rating
                        name='serviceRating'
                        value={state.serviceRating}
                        onChange={onChangeRating}
                    />
                        <span>({state.serviceRating})</span>
                    </Typography>
                    <Typography
                        variant='body1'
                        component='p'
                        className={classes.rating}
                    >
                        Рейтинг интерьера: <Rating
                        name='interiorRating'
                        value={state.interiorRating}
                        onChange={onChangeRating}
                    />
                        <span>({state.interiorRating})</span>
                    </Typography>
                </Grid>
                <Button variant="contained" type='submit'>Отправить</Button>
            </form>
        </Grid>
    );
};

ReviewForm.propTypes = {
    state: PropTypes.object.isRequired,
    error: PropTypes.func.isRequired,
    onChangeRating: PropTypes.func.isRequired,
    onChangeComment: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default ReviewForm;