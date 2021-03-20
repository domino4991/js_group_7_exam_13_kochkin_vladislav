import React from 'react';
import {Button, Grid, makeStyles, Typography} from "@material-ui/core";
import FormElement from "../UI/FormElement/FormElement";

const useStyles = makeStyles(() => ({
    form: {
        maxWidth: '500px',
        margin: '0 auto'
    },
    title: {
        margin: '40px 0'
    }
}))

const InstitutionForm = ({state, onSubmit, onChange, error, onChangeFile, onCheckboxChange}) => {
    const classes = useStyles();
    return (
        <>
            <Grid>
                <Typography
                    align='center'
                    variant='h5'
                    component='h5'
                    className={classes.title}
                >
                    Добавить новое заведение
                </Typography>
                <form onSubmit={onSubmit} className={classes.form}>
                    <FormElement
                        label='Название'
                        name='title'
                        type='text'
                        value={state.title}
                        changed={onChange}
                        error={error('title')}
                        id='title-inp'
                    />
                    <FormElement
                        label='Описание'
                        name='description'
                        type='text'
                        value={state.description}
                        changed={onChange}
                        error={error('description')}
                        multiline={true}
                        rows={5}
                        id='desc-inp'
                    />
                    <FormElement
                        label='Добавить фото'
                        changedFile={onChangeFile}
                        name='mainImage'
                        id='image-inp'
                        value={state.mainImage}
                        error={error('mainImage')}
                        type='file'
                    />
                    <FormElement
                        label='Я согласен'
                        name='agree'
                        onCheckboxChange={onCheckboxChange}
                        checkbox
                        id='checkbox'
                    />
                    <Button variant='contained' type='submit' id='send-btn'>Отправить</Button>
                </form>
            </Grid>
        </>
    );
};

export default InstitutionForm;