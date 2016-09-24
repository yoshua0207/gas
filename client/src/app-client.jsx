/* @flow */
"use strict";

// tell webpack to copy static html and css to build folder
require.context("../public/", true, /^\.\/.*\.(html|css)/);

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import reduxThunk from "redux-thunk";
import { AUTH_USER } from "./actions/types";
import requireAuth from "./components/hoc/requireAuth";
import SignIn from "./components/auth/SignIn";
import SignOut from "./components/auth/SignOut";
import SignUp from "./components/auth/SignUp";
import reducers from "./reducers";
import App from "./components/App";
import Dummy from "./components/Dummy";
import Welcome from "./components/Welcome";

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem("token");

if (token) {
    // updating app state before anything is rendered
    store.dispatch({type: AUTH_USER});
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Welcome}/>
                <Route path="signin" component={SignIn}/>
                <Route path="signout" component={SignOut}/>
                <Route path="signup" component={SignUp}/>
                <Route path="resources" component={requireAuth(Dummy)}/>
            </Route>
        </Router>
    </Provider>
    , document.querySelector(".app")
);

