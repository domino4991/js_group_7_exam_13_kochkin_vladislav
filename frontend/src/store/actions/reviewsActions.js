import {
    DELETE_REVIEW_ERROR,
    DELETE_REVIEW_SUCCESS,
    GET_REVIEWS_ERROR,
    GET_REVIEWS_SUCCESS,
    POST_REVIEW_ERROR,
    POST_REVIEW_SUCCESS
} from "../actionTypes";
import axiosBase from "../../utils/axiosBase";
import {toast} from "react-toastify";
import {getInstitution} from "./institutionActions";

const getReviewsSuccess = data => ({type: GET_REVIEWS_SUCCESS, data});
const getReviewsError = error => ({type: GET_REVIEWS_ERROR, error});

const postReviewSuccess = data => ({type: POST_REVIEW_SUCCESS, data});
const postReviewError = error => ({type: POST_REVIEW_ERROR, error});

const deleteReviewSuccess = () => ({type: DELETE_REVIEW_SUCCESS});
const deleteReviewError = error => ({type: DELETE_REVIEW_ERROR, error});

export const getReviews = id => {
    return async dispatch => {
        try {
            const {data} = await axiosBase.get(`/reviews/${id}`);
            dispatch(getReviewsSuccess(data));
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch(getReviewsError(e.response.data));
            } else {
                dispatch(getReviewsError(e.message));
            }
        }
    }
};

export const postReview = (id, reviewData) => {
    return async dispatch => {
        try {
            const {data} = await axiosBase.post(`/reviews/${id}`, reviewData);
            toast.success(data.message);
            dispatch(postReviewSuccess());
            dispatch(getInstitution(id));
            dispatch(getReviews(id));
        } catch (e) {
            if(e.response && e.response.data) {
                toast.error(e.response.data.message);
                dispatch(postReviewError(e.response.data));
                dispatch(getReviews(id));
            } else {
                dispatch(postReviewError(e.message));
            }
        }
    }
};

export const deleteReview = (id, instId) => {
    return async dispatch => {
        try {
            const {data} = await axiosBase.delete(`/reviews?revID=${id}&instID=${instId}`);
            toast.success(data.message);
            dispatch(deleteReviewSuccess());
            dispatch(getReviews(instId));
            dispatch(getInstitution(instId));
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch(deleteReviewError(e.response.data));
            } else {
                dispatch(deleteReviewError(e.message));
            }
        }
    }
}