import React from 'react';
import { Provider } from 'react-redux';
import {BrowserRouter as Router} from "react-router-dom";
import StoreSingleton from './store';
import Routers from './Routers';


const ReduxApp = () => {
    const store = StoreSingleton();
    return (
        <Provider store={store}>
            <Router>
                <Routers/>
            </Router>
        </Provider>
    );
};

export default ReduxApp;