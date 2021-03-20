import {
    CLEAR_ERRORS, DELETE_INST_ERROR, DELETE_INST_SUCCESS,
    GET_INSTITUTION_ERROR,
    GET_INSTITUTION_SUCCESS,
    GET_INSTITUTIONS_ERROR,
    GET_INSTITUTIONS_SUCCESS, POST_INST_ERROR, POST_INST_SUCCESS
} from "../actionTypes";

const initState = {
    institutions: null,
    institutionsErrors: null,
    institution: null
};

export const institutionReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_INSTITUTIONS_SUCCESS:
            return {
                ...state,
                institutions: action.data,
                institutionsErrors: null
            };
        case GET_INSTITUTION_SUCCESS:
            return {
                ...state,
                institution: action.data,
                institutionsErrors: null
            };
        case POST_INST_SUCCESS:
        case DELETE_INST_SUCCESS:
            return {
                ...state,
                institutionsErrors: null
            }
        case GET_INSTITUTIONS_ERROR:
        case GET_INSTITUTION_ERROR:
        case POST_INST_ERROR:
        case DELETE_INST_ERROR:
            return {
                ...state,
                institutionsErrors: action.error
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                institutionsErrors: null
            };
        default:
            return state;
    }
}