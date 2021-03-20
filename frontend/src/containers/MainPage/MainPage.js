import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getInstitutions} from "../../store/actions/institutionActions";
import InstitutionsItems from "../../components/InstitutionsItems/InstitutionsItems";
import {Container, makeStyles, Typography} from "@material-ui/core";
import {CLEAR_ERRORS} from "../../store/actionTypes";

const useStyles = makeStyles(theme => ({
    mainPageTitle: {
        marginBottom: theme.spacing(4)
    },
    container: {
        marginBottom: '200px'
    }
}))

const MainPage = () => {
    const classes = useStyles();
    const {institutions} = useSelector(state => state.institutions);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getInstitutions());
        dispatch({type: CLEAR_ERRORS});
    }, [dispatch]);

    return (
        <Container maxWidth='lg' className={classes.container}>
            <Typography
                variant='h4'
                component='h2'
                align='center'
                className={classes.mainPageTitle}
            >
                Все заведения
            </Typography>
            {institutions && <InstitutionsItems institutions={institutions} />}
        </Container>
    );
};

export default MainPage;