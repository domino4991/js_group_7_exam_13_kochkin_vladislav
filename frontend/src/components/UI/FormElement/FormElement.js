import React from "react";
import {
    TextField,
    makeStyles
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';
import FileInput from "./FileInput";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles(theme => ({
    gridItem: {
        marginBottom: theme.spacing(3)
    }
}));

const FormElement = ({
                         type,
                         name,
                         value,
                         changed,
                         error,
                         label,
                         id,
                         changedFile,
                         multiline,
                         rows,
                         required,
                         margin,
                         onCheckboxChange,
    checkbox
                     }) => {
    const classes = useStyles();
    if (checkbox)
        return (
            <FormControlLabel
                control={
                    <Checkbox
                        name={name}
                        onChange={onCheckboxChange}
                        color="primary"
                    />
                }
                label={label}
            />
        );
    return (
        <Grid item xs={12} className={classes.gridItem}>
            {type !== 'file' ? <TextField
                fullWidth
                type={type}
                multiline={multiline}
                rows={rows}
                name={name}
                value={value}
                onChange={changed}
                error={!!error}
                helperText={error}
                label={label}
                variant='outlined'
                id={id}
                required={required}
                margin={margin}
            /> : <FileInput
                onChange={changedFile}
                label={label}
                name={name}
                error={error}
                id={id}
            />}
        </Grid>
    );
};

FormElement.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.any,
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    changed: PropTypes.func,
    id: PropTypes.string,
    multiline: PropTypes.bool,
    rows: PropTypes.number
}

export default FormElement;
