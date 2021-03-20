import {
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    LOGOUT_ERROR,
    LOGOUT_SUCCESS,
    REGISTER_ERROR,
    REGISTER_SUCCESS
} from "../actionTypes";

const initState = {
    user: null,
    userErrors: null
};

export const userReducer = (state = initState, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                userErrors: null
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.data,
                userErrors: null
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                user: null,
                userErrors: null
            };
        case REGISTER_ERROR:
        case LOGIN_ERROR:
            return {
                ...state,
                userErrors: action.error
            };
        case LOGOUT_ERROR:
            return {
                ...state,
                user: null,
                userErrors: action.error
            };
        default:
            return state;
    }
}