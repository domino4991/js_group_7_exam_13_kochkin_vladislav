import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getInstitutions} from "../../store/actions/institutionActions";
import InstitutionsItems from "../../components/InstitutionsItems/InstitutionsItems";
import {Container, makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    mainPageTitle: {
        marginBottom: theme.spacing(4)
    }
}))

const MainPage = () => {
    const classes = useStyles();
    const {institutions} = useSelector(state => state.institutions);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getInstitutions());
    }, [dispatch]);

    return (
        <Container maxWidth='lg'>
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