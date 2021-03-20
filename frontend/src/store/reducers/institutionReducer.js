import {GET_INSTITUTIONS_ERROR, GET_INSTITUTIONS_SUCCESS} from "../actionTypes";

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
        case GET_INSTITUTIONS_ERROR:
            return {
                ...state,
                institutionsErrors: action.error
            };
        default:
            return state;
    }
}