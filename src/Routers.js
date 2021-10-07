import React, { Fragment } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import SignUp from './Users/Signup/containers/signup';
import Login from './Users/Login/containers/Login';
import HomePage from './HomePage/container/homePage';
import Records from './Records/container/Records';

const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => (
    <Route {...rest} render={(props) => (
        Boolean(isAuthenticated) ? 
           <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location }}} />   
)}/>)

const Routers = props => {
    return (
        <Fragment>
            <Route path="/login" component={Login} />
            <Route path="/sign-up" component={SignUp} />

            <ProtectedRoute exact path="/" component={HomePage} {...props} />
            <ProtectedRoute exact path="/records/:id" component={Records} {...props} />
        </Fragment>
    );
};

const mapStateToProps = state => ({
    ...state.UserReducer,
});

export default withRouter(connect(mapStateToProps)(Routers));