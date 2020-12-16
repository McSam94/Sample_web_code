import React from 'react';
import { Context as UiContext, Provider as UiProvider } from './ui';
import { Context as AuthContext, Provider as AuthProvider } from './auth';

// eslint-disable-next-line react/prop-types
const Providers = ({ children }) => {
    return (
        <UiProvider>
            <AuthProvider>{children}</AuthProvider>
        </UiProvider>
    );
};

export { Providers, UiContext, AuthContext };
