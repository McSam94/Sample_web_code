import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login, Home, Setting } from 'Pages';
import ProtectedRoute from './protected';

const Navigation = () => {
    return (
        <Switch>
            <Route path='/login' component={Login} />
            <ProtectedRoute exact path='/' component={Home} />
            <ProtectedRoute exact path='/setting' component={Setting} />
        </Switch>
    );
};

export default Navigation;
