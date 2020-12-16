import { useReducerContext, getInitialState } from 'Utils';
import { login, logout } from './auth-actions';
import { AuthReducer } from './auth-reducer';

export const STORE_NAME = 'AuthStore';

// eslint-disable-next-line react-hooks/rules-of-hooks
export const { Context, Provider } = useReducerContext({
    reducer: AuthReducer,
    actions: { login, logout },
    initialState: getInitialState(STORE_NAME) || {
        token: '',
        isLoggingIn: false,
        isLoggedIn: true,
        errorMsg: '',
    },
    displayName: STORE_NAME,
});
