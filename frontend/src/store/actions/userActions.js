import {
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    LOGOUT_ERROR,
    LOGOUT_SUCCESS,
    REGISTER_ERROR,
    REGISTER_SUCCESS
} from "../actionTypes";
import axiosBase from "../../utils/axiosBase";
import {toast} from "react-toastify";
import {push} from 'connected-react-router';

const registerSuccess = () => ({type: REGISTER_SUCCESS});
const registerError = error => ({type: REGISTER_ERROR, error});

const loginSuccess = data => ({type: LOGIN_SUCCESS, data});
const loginError = error => ({type: LOGIN_ERROR, error});

const logoutSuccess = () => ({type: LOGOUT_SUCCESS});
const logoutError = error => ({type: LOGOUT_ERROR, error});

export const register = userData => {
    return async dispatch => {
        try {
            const {data} = await axiosBase.post(`/users`, userData);
            toast.success(data.message);
            dispatch(registerSuccess())
            dispatch(push('/login'));
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch(registerError(e.response.data));
            } else {
                dispatch(registerError(e.message));
            }
        }
    };
}

export const login = userData => {
    return async dispatch => {
        try {
            const {data} = await axiosBase.post(`/users/sessions`, userData);
            toast.success(data.message);
            dispatch(loginSuccess(data.user));
            dispatch(push('/'));
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch(loginError(e.response.data));
            } else {
                dispatch(loginError(e.message));
            }
        }
    }
};

export const logout = () => {
    return async (dispatch, getState) => {
        const token = getState().users.user && getState().users.user.token;
        const headers = {'Authorization': token};
        try {
            const {data} = await axiosBase.delete('/users/sessions', {headers});
            toast.success(data.message);
            dispatch(dispatch(logoutSuccess()));
            dispatch(push('/'));
        } catch (e) {
            if(e.response && e.response.data) {
                toast.error(e.response.data.error);
                dispatch(logoutError(e.response.data.error));
            } else {
                dispatch(logoutError(e.message));
            }
        }
    }
}