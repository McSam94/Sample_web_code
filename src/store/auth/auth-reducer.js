import { authAction } from './auth-actions';

export const AuthReducer = (state, action) => {
    switch (action.type) {
        case authAction.LOGIN.REQUEST:
            return {
                ...state,
                isLoggingIn: true,
            };
        case authAction.LOGIN.SUCCESS:
            return {
                ...state,
                token: action?.params?.token,
                isLoggingIn: false,
                isLoggedIn: true,
            };
        case authAction.LOGIN.FAIL:
            return {
                ...state,
                token: '',
                isLoggingIn: false,
                isLoggedIn: false,
                errorMsg: action?.params?.errorMsg,
            };
        case authAction.LOGOUT.REQUEST:
            return {
                ...state,
                isLoggingOut: true,
            };
        case authAction.LOGOUT.SUCCESS:
            return {
                ...state,
                isLoggingOut: false,
                isLoggedOut: true,
                token: '',
            };
        case authAction.LOGOUT.FAIL:
            return {
                ...state,
                isLoggingOut: false,
                isLoggedOut: false,
            };
        default:
            return state;
    }
};
