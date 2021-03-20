import React from 'react';
import {makeStyles ,Typography, Grid, Button} from "@material-ui/core";
import {useLocation} from "react-router";
import FormElement from "../UI/FormElement/FormElement";
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    loginRegisterGrid: {
        maxWidth: '1200px',
        margin: '0 auto'
    },
    loginRegisterTitle: {
        marginBottom: theme.spacing(3)
    },
    loginRegisterForm: {
        maxWidth: '300px',
        margin: '0 auto'
    },
    loginRegisterFormBtn: {
        marginTop: theme.spacing(3)
    }
}))

const LoginRegisterForm = ({
    onChange,
    state,
    error,
    onSubmit
}) => {
    const classes = useStyles();
    const location = useLocation();
    return (
        <Grid className={classes.loginRegisterGrid}>
            <Typography
                variant='h5'
                component='h5'
                align='center'
                className={classes.loginRegisterTitle}
            >
                {location.pathname === '/login' ? 'Вход' : 'Регистрация'}
            </Typography>
            <form
                className={classes.loginRegisterForm}
                onSubmit={onSubmit}
            >
                <FormElement
                    onChange={onChange}
                    value={state.username}
                    id='username'
                    label='Логин'
                    name='username'
                    required={false}
                    type='text'
                    error={error('username')}
                    margin='normal'
                />
                <FormElement
                    onChange={onChange}
                    value={state.password}
                    id='password'
                    label='Пароль'
                    name='password'
                    required={false}
                    type='password'
                    error={error('password')}
                />
                <Button
                    variant='contained'
                    type='submit'
                    fullWidth
                    className={classes.loginRegisterFormBtn}
                >Отправить</Button>
            </form>
        </Grid>
    );
};

LoginRegisterForm.propTypes = {
    onChange: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
    error: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
}

export default LoginRegisterForm;