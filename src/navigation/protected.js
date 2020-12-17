import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from 'Stores';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { token, isLoggedIn } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={(props) =>
                token && isLoggedIn ? <Component {...props} /> : <Redirect to='/login' />
            }
        />
    );
};

ProtectedRoute.propTypes = {
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default ProtectedRoute;
