import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App/index';
import reducer from './store/reducer';
import config from './config';

const store = createStore(reducer);

function PatientApp() {
    return (
        <div id="patient">
            <Provider store={store}>
                <BrowserRouter basename={config.basename}>
                    {/* basename="/datta-able" */}
                    <App />
                </BrowserRouter>
            </Provider>
        </div>
    );
}

export default PatientApp;
