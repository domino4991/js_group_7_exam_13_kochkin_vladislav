import React from "react";
import './App.css';
import { Switch, Route } from "react-router-dom";
import { Redirect } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout/Layout";
import LoginRegisterPage from "./containers/LoginRegisterPage/LoginRegisterPage";
import {useSelector} from "react-redux";
import MainPage from "./containers/MainPage/MainPage";
import FullPage from "./containers/FullPage/FullPage";
import CreateInstitutionPage from "./containers/CreateInstitutionPage/CreateInstitutionPage";

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
            <ProtectedRoute
                path={`/add-new-institution`}
                component={CreateInstitutionPage}
                isAllowed={user}
                redirectTo='/'
            />
            <Route path='/' exact component={MainPage} />
            <Route path='/full/:id' component={FullPage} />
        </Switch>
    </Layout>
  );
}

export default App;
