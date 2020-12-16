import React, { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { debugContextDevtool } from 'react-context-devtool';
import { Providers } from 'Stores';
import App from './App';
import './i18n';

const appContainer = document.getElementById('app');

const initRender = () => {
    // eslint-disable-next-line react/no-render-return-value
    ReactDOM.render(
        <StrictMode>
            <Suspense fallback="Loading...">
                <Providers>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </Providers>
            </Suspense>
        </StrictMode>,
        appContainer,
    );

    if (!window.hasOwnProperty('cordova')) {
        debugContextDevtool(appContainer, {
            debugReducer: true,
            debugContext: true,
            disable: process.env.NODE_ENV === 'production',
        });
    }
};

const app = {
    // Application Constructor
    initialize: function () {
        if (window.hasOwnProperty('cordova'))
            document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        else initRender();
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        initRender();
    },
};

app.initialize();
