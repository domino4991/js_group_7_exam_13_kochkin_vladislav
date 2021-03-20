import React, {useEffect, useState} from 'react';
import {Container, makeStyles, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {deleteInst, getInstitution} from "../../store/actions/institutionActions";
import {Grid} from "@material-ui/core";
import {urlApi} from "../../utils/constants";
import imagePlaceholder from "../../assets/images/image-placeholder-350x350.png";
import {getImages, postImage} from "../../store/actions/imagesActions";
import {getReviews, postReview} from "../../store/actions/reviewsActions";
import ImageItems from "../../components/ImageItems/ImageItems";
import RatingItem from "../../components/RatingItem/RatingItem";
import ReviewItems from "../../components/ReviewItems/ReviewItems";
import ReviewForm from "../../components/ReviewItems/ReviewForm";
import ImageUpload from "../../components/ImageItems/ImageUpload";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    mainImage: {
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
        display: 'block'
    },
    container: {
        justifyContent: 'space-between',
        borderBottom: '1px solid #000',
        paddingBottom: theme.spacing(4),
        marginBottom: theme.spacing(4)
    },
    title: {
        marginBottom: theme.spacing(4)
    },
    imgBox: {
        width: '40%'
    }
}))

const FullPage = ({match}) => {
    const classes = useStyles();
    const {institution} = useSelector(state => state.institutions);
    const {images, imagesErrors} = useSelector(state => state.images);
    const {reviews, reviewsErrors} = useSelector(state => state.reviews);
    const {user} = useSelector(state => state.users);
    const dispatch = useDispatch();
    const id = match.params.id;
    const imageUrl = imagePlaceholder;
    const [ratings, setRatings] = useState({
        comment: '',
        foodRating: 0,
        serviceRating: 0,
        interiorRating: 0
    });

    const [stateImage, setStateImage] = useState({
        image: ''
    });

    useEffect(() => {
        dispatch(getInstitution(id));
        dispatch(getImages(id));
        dispatch(getReviews(id));
    }, [dispatch, id]);

    const onChangeRating = (e, newValue) => {
        const name = e.target.name;
        const value = newValue;
        setRatings(prevState => ({
            ...prevState,
            [name]: value
        }));
        if(value === null) {
            setRatings(prevState => ({
                ...prevState,
                [name]: 0
            }));
        }
    };

    const getFieldError = fieldName => {
        try {
            return reviewsErrors.errors[fieldName].message;
        } catch (e) {
            return null;
        }
    };

    const getFieldErrorImage = fieldName => {
        try {
            return imagesErrors.errors[fieldName].message;
        } catch (e) {
            return null;
        }
    }

    const onChangeComment = e => {
        const name = e.target.name;
        const value = e.target.value;
        setRatings(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onSubmitReview = e => {
        e.preventDefault();
        dispatch(postReview(id, {...ratings}));
    }

    const onChangeFile = e => {
        const name = e.target.name;
        const file = e.target.files[0];
        setStateImage(prevState => ({
            ...prevState,
            [name]: file
        }));
    };

    const onSubmitImage = e => {
        e.preventDefault();
        if(stateImage.image !== '') {
            const formData = new FormData();
            Object.keys(stateImage).forEach(key => {
                formData.append(key, stateImage[key]);
            });
            dispatch(postImage(id, formData));
            setStateImage(prevState => ({
                ...prevState,
                image: ''
            }));
        }
    };

    return (
        <Container maxWidth='lg'>
            <Grid
                container
                className={classes.container}
            >
                <Grid
                    item
                    className={classes.content}
                >
                    {user && user.role === 'admin' &&
                    <Button
                        type='button'
                        fullWidth
                        variant='contained'
                        onClick={() => dispatch(deleteInst(id))}
                    >
                        Удалить
                    </Button>}
                    <Typography
                        variant='h3'
                        component='h5'
                        className={classes.title}
                    >
                        {institution?.title}
                    </Typography>
                    <Typography
                        variant='body1'
                        component='p'
                    >
                        {institution?.description}
                    </Typography>
                </Grid>
                <Grid
                    item
                    className={classes.imgBox}
                >
                    <img
                        src={institution?.mainImage ? `${urlApi}/uploads/${institution?.mainImage}` : imageUrl}
                        alt={institution?.title}
                        className={classes.mainImage}
                    />
                </Grid>
            </Grid>
            <ImageItems images={images} imagesErrors={imagesErrors}/>
            <RatingItem institution={institution} />
            <ReviewItems reviews={reviews} reviewsErrors={reviewsErrors} />
            <ReviewForm
                error={getFieldError}
                onChangeRating={onChangeRating}
                state={ratings}
                onChangeComment={onChangeComment}
                onSubmit={onSubmitReview}
            />
            <ImageUpload
                onSubmit={onSubmitImage}
                onChangeImage={onChangeFile}
                image={stateImage.image}
                error={getFieldErrorImage}
            />
        </Container>
    );
};

export default FullPage;