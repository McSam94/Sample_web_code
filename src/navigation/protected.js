import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Home, Setting } from 'Pages';
import { AuthContext } from 'Stores';

const ProtectedNavigation = () => {
    const { token } = useContext(AuthContext);

    return (
        <>
            {token ? (
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/setting">
                        <Setting />
                    </Route>
                </Switch>
            ) : (
                <Redirect to="/login" />
            )}
        </>
    );
};

export default ProtectedNavigation;
