import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Menu, MenuItem} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import {logout} from "../../../store/actions/userActions";

const UserMenu = () => {
    const {user} = useSelector(state => state.users);
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    return (
        <>
            <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                color='inherit'
                onClick={e => setAnchorEl(e.currentTarget)}
            >
                Привет, {user && user.username}
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem
                    component={NavLink}
                    to='/add-new-institution'
                    exact
                >
                    Добавить новое заведение
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        dispatch(logout())
                    }}
                >
                    Выход
                </MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;