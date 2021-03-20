import React from "react";
import './App.css';
import { Switch, Route } from "react-router-dom";
import { Redirect } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout/Layout";
import LoginRegisterPage from "./containers/LoginRegisterPage/LoginRegisterPage";
import {useSelector} from "react-redux";

const ProtectedRoute = ({isAllowed, redirectTo, ...props}) => {
    return isAllowed ? (<Route {...props} />)
        : (<Redirect to={redirectTo} />
    );
};


function App() {
    const {user} = useSelector(state => state.users);
  return (
    <Layout>
        <ToastContainer autoClose={3000} position='top-center' />
        <Switch>
            <ProtectedRoute
                path={`/login`}
                component={LoginRegisterPage}
                isAllowed={!user}
                redirectTo='/'
            />
            <ProtectedRoute
                path={`/register`}
                component={LoginRegisterPage}
                isAllowed={!user}
                redirectTo='/'
            />
        </Switch>
    </Layout>
  );
}

export default App;
