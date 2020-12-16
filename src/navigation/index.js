import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login } from 'Pages';
import ProtectedNavigation from './protected';

const Navigation = () => {
    return (
        <Switch>
            <Route path="/login">
                <Login />
            </Route>
            <ProtectedNavigation />
        </Switch>
    );
};

export default Navigation;
