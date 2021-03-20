import React, {useState} from 'react';
import {Container, Grid} from "@material-ui/core";
import InstitutionForm from "../../components/InstitutionsItems/InstitutionForm";
import {useDispatch, useSelector} from "react-redux";
import {postInst} from "../../store/actions/institutionActions";

const CreateInstitutionPage = () => {
    const {institutionsErrors} = useSelector(state => state.institutions);
    const [state, setState] = useState({
        title: '',
        description: '',
        mainImage: '',
        agree: false
    });
    const dispatch = useDispatch();

    const onChangeHandler = e => {
        const name = e.target.name;
        const value = e.target.value;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const getFieldError = fieldName => {
        try {
            return institutionsErrors.errors[fieldName].message;
        } catch (e) {
            return null;
        }
    };

    const onChangeFile = e => {
        const name = e.target.name;
        const file = e.target.files[0];
        setState(prevState => ({
            ...prevState,
            [name]: file
        }));
    };

    const checkboxChangeHandler = () => {
        if (!state.agree) {
            setState(prevState => ({
                ...prevState,
                agree: true,
            }));
        } else {
            setState(prevState => ({
                ...prevState,
                agree: false,
            }));
        }
    };

    const onSubmitHandler = e => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(state).forEach(key => {
            formData.append(key, state[key]);
        });
        dispatch(postInst(formData));
        setState({
            title: '',
            description: '',
            mainImage: '',
            agree: false
        });
    }


    return (
        <Grid component='section'>
            <Container maxWidth='lg'>
                <InstitutionForm
                    state={state}
                    onChange={onChangeHandler}
                    error={getFieldError}
                    onChangeFile={onChangeFile}
                    onCheckboxChange={checkboxChangeHandler}
                    onSubmit={onSubmitHandler}
                />
            </Container>
        </Grid>
    );
};

export default CreateInstitutionPage;