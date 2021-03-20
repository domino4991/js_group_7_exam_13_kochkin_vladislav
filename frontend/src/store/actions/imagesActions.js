import {
    DELETE_IMAGE_ERROR,
    DELETE_IMAGE_SUCCESS,
    GET_IMAGES_ERROR,
    GET_IMAGES_SUCCESS,
    POST_IMAGE_ERROR,
    POST_IMAGE_SUCCESS
} from "../actionTypes";
import axiosBase from "../../utils/axiosBase";
import {toast} from "react-toastify";

const getImagesSuccess = data => ({type: GET_IMAGES_SUCCESS, data});
const getImagesError = error => ({type: GET_IMAGES_ERROR, error});

const postImageSuccess = () => ({type: POST_IMAGE_SUCCESS});
const postImageError = error => ({type: POST_IMAGE_ERROR, error});

const deleteImageSuccess = () => ({type: DELETE_IMAGE_SUCCESS});
const deleteImageError = error => ({type: DELETE_IMAGE_ERROR, error});

export const getImages = id => {
    return async dispatch => {
        try {
            const {data} = await axiosBase.get(`/images/${id}`);
            dispatch(getImagesSuccess(data));
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch(getImagesError(e.response.data));
            } else {
                dispatch(getImagesError(e.message));
            }
        }
    }
};

export const postImage = (id, imageData) => {
    return async dispatch => {
        try {
            const {data} = await axiosBase.post(`/images/${id}`, imageData);
            toast.success(data.message);
            dispatch(postImageSuccess());
            dispatch(getImages(id));
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch(postImageError(e.response.data));
            } else {
                dispatch(postImageError(e.message));
            }
        }
    }
};

export const deleteImage = (id, idInst) => {
    return async dispatch => {
        try {
            const {data} = await axiosBase.delete(`/images/${id}`);
            toast.success(data.message);
            dispatch(deleteImageSuccess())
            dispatch(getImages(idInst));
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch(deleteImageError(e.response.data));
            } else {
                dispatch(deleteImageError(e.message));
            }
        }
    }
}