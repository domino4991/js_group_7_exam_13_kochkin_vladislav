import React from 'react';
import {Grid, makeStyles} from "@material-ui/core";
import InstitutionItem from "./InstitutionItem/InstitutionItem";

const useStyles = makeStyles(() => ({
    container: {
        justifyContent: 'flex-start',
    }
}))

const InstitutionsItems = ({institutions}) => {
    const classes = useStyles();
    return (
        <>
            <Grid
                container
                className={classes.container}
            >
                {institutions && institutions.map(inst => <InstitutionItem
                    key={inst._id}
                    title={inst.title}
                    image={inst.mainImage}
                    allRating={inst.allRating}
                    id={inst._id}
                    rateCount={inst.rateCount}
                    imagesCount={inst.imagesCount}
                />)}
            </Grid>
        </>
    );
};

export default InstitutionsItems;