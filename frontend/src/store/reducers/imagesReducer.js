import {
    CLEAR_ERRORS,
    DELETE_IMAGE_ERROR, DELETE_IMAGE_SUCCESS,
    GET_IMAGES_ERROR,
    GET_IMAGES_SUCCESS,
    POST_IMAGE_ERROR,
    POST_IMAGE_SUCCESS
} from "../actionTypes";

const initState = {
    images: null,
    imagesErrors: null
};

export const imagesReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_IMAGES_SUCCESS:
            return {
                ...state,
                images: action.data,
                imagesErrors: null
            };
        case POST_IMAGE_SUCCESS:
        case DELETE_IMAGE_SUCCESS:
            return {
                ...state,
                imagesErrors: null
            }
        case GET_IMAGES_ERROR:
        case POST_IMAGE_ERROR:
        case DELETE_IMAGE_ERROR:
            return {
                ...state,
                imagesErrors: action.error
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                imagesErrors: null
            };
        default:
            return state;
    }
};