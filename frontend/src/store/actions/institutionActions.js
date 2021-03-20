import {GET_INSTITUTIONS_ERROR, GET_INSTITUTIONS_SUCCESS} from "../actionTypes";
import axiosBase from "../../utils/axiosBase";

const getInstitutionsSuccess = data => ({type: GET_INSTITUTIONS_SUCCESS, data});
const getInstitutionsError = error => ({type: GET_INSTITUTIONS_ERROR, error});

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