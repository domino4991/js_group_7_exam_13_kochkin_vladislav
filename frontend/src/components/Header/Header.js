import React from 'react';
import {makeStyles, AppBar, Toolbar, Typography, Button, Container} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import AnonMenu from "../UI/AnonMenu/AnonMenu";
import UserMenu from "../UI/UserMenu/UserMenu";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginBottom: theme.spacing(3),
        backgroundColor: '#37474f',
        color: '#e8eaf6'
    },
    title: {
        flexGrow: 1,
    },
}));

const Header = () => {
    const classes = useStyles();
    const {user} = useSelector(state => state.users);
    return (
        <AppBar position="static" className={classes.root}>
            <Container maxWidth='lg'>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Cafe Critic
                    </Typography>
                    <Button
                        color='inherit'
                        component={NavLink}
                        to='/'
                        exact
                    >
                        Home
                    </Button>
                    {!user ?
                        <AnonMenu />
                        :
                        <UserMenu />
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;