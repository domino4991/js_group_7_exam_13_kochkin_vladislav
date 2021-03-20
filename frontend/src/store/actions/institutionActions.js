import {
    DELETE_INST_ERROR,
    DELETE_INST_SUCCESS,
    GET_INSTITUTION_ERROR,
    GET_INSTITUTION_SUCCESS,
    GET_INSTITUTIONS_ERROR,
    GET_INSTITUTIONS_SUCCESS, POST_INST_ERROR, POST_INST_SUCCESS
} from "../actionTypes";
import axiosBase from "../../utils/axiosBase";
import {toast} from "react-toastify";
import {push} from 'connected-react-router';

const getInstitutionsSuccess = data => ({type: GET_INSTITUTIONS_SUCCESS, data});
const getInstitutionsError = error => ({type: GET_INSTITUTIONS_ERROR, error});

const getInstitutionSuccess = data => ({type: GET_INSTITUTION_SUCCESS, data});
const getInstitutionError = error => ({type: GET_INSTITUTION_ERROR, error});

const postInstSuccess = () => ({type: POST_INST_SUCCESS});
const postInstError = error => ({type: POST_INST_ERROR, error});

const deleteInstSuccess = () => ({type: DELETE_INST_SUCCESS});
const deleteInstError = error => ({type: DELETE_INST_ERROR, error});

export const getInstitutions = () => {
    return async dispatch => {
        try {
            const {data} = await axiosBase.get('/institutions');
            dispatch(getInstitutionsSuccess(data));
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch(getInstitutionsError(e.response.data));
            } else {
                dispatch(getInstitutionsError(e.message));
            }
        }
    };
};

export const getInstitution = id => {
    return async dispatch => {
        try {
            const {data} = await axiosBase.get(`/institutions/${id}`);
            dispatch(getInstitutionSuccess(data));
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch(getInstitutionError(e.response.data));
            } else {
                dispatch(getInstitutionError(e.message));
            }
        }
    }
};

export const postInst = instData => {
    return async dispatch => {
        try {
            const {data} = await axiosBase.post(`/institutions`, instData);
            toast.success(data.message);
            dispatch(postInstSuccess());
            dispatch(push('/'));
        } catch (e) {
            if(e.response && e.response.data) {
                toast.error(e.response.data.error);
                dispatch(postInstError(e.response.data));
            } else {
                dispatch(postInstError(e.message));
            }
        }
    }
}

export const deleteInst = id => {
    return async dispatch => {
        try {
            const {data} = await axiosBase.delete(`/institutions/${id}`);
            toast.success(data.message);
            dispatch(deleteInstSuccess());
            dispatch(push('/'))
            dispatch(getInstitutions());
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch(deleteInstError(e.response.data));
            } else {
                dispatch(deleteInstError(e.message));
            }
        }
    }
}