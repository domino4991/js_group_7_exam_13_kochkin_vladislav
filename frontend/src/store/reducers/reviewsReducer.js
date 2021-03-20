import {
    CLEAR_ERRORS, DELETE_REVIEW_ERROR, DELETE_REVIEW_SUCCESS,
    GET_REVIEWS_ERROR,
    GET_REVIEWS_SUCCESS,
    POST_REVIEW_ERROR,
    POST_REVIEW_SUCCESS
} from "../actionTypes";

const initState = {
    reviews: null,
    reviewsErrors: null
};

export const reviewsReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_REVIEWS_SUCCESS:
            return {
                ...state,
                reviewsErrors: null,
                reviews: action.data
            }
        case POST_REVIEW_SUCCESS:
        case DELETE_REVIEW_SUCCESS:
            return {
                ...state,
                reviewsErrors: null
            };
        case GET_REVIEWS_ERROR:
        case POST_REVIEW_ERROR:
        case DELETE_REVIEW_ERROR:
            return {
                ...state,
                reviewsErrors: action.error
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                reviewsErrors: null
            };
        default:
            return state;
    }
}