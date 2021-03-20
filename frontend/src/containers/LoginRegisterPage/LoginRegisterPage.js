import React, {useState} from 'react';
import {Grid} from "@material-ui/core";
import LoginRegisterForm from "../../components/LoginRegister/LoginRegisterForm";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router";
import {login, register} from "../../store/actions/userActions";

const LoginRegisterPage = () => {
    const {userErrors} = useSelector(state => state.users);
    const [state, setState] = useState({
        username: '',
        password: ''
    });
    const location = useLocation();
    const dispatch = useDispatch();

    const onChangeHandler = e => {
        const name = e.target.name;
        const value = e.target.value;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const getFieldError = fieldName => {
        try {
            return userErrors.errors[fieldName].message;
        } catch (e) {
            return null;
        }
    };

    const onSubmitHandler = e => {
        e.preventDefault();
        if(location.pathname === '/login') {
            dispatch(login({...state}));
            setState({
                username: '',
                password: ''
            });
        } else {
            dispatch(register({...state}));
            setState({
                username: '',
                password: ''
            });
        }
    };

    return (
        <Grid component='section'>
            <LoginRegisterForm
                error={getFieldError}
                onChange={onChangeHandler}
                state={state}
                onSubmit={onSubmitHandler}
            />
        </Grid>
    );
};

export default LoginRegisterPage;