/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback } from 'react';
import { createRequestAction, removeState, RESPONSE_STATUS } from 'Utils';
import { AuthSrv } from 'Services';
import { STORE_NAME } from '../auth';

export const authAction = Object.freeze({
    LOGIN: createRequestAction('login'),
    LOGOUT: createRequestAction('logout'),
});

export const login = (dispatch) => {
    return useCallback(
        async (username, password) => {
            dispatch({ type: authAction.LOGIN.REQUEST });

            try {
                const result = await AuthSrv.login({ username, password });

                if (result?.status === RESPONSE_STATUS.SUCCESS) {
                    dispatch({
                        type: authAction.LOGIN.SUCCESS,
                        params: {
                            token: result?.data?.token,
                        },
                    });
                } else {
                    dispatch({
                        type: authAction.LOGIN.FAIL,
                        params: {
                            errorMsh: result?.data?.error,
                        },
                    });
                }
            } catch (error) {
                dispatch({
                    type: authAction.LOGIN.FAIL,
                    errorMsh: error?.data?.error,
                });
            }
        },
        [dispatch],
    );
};

export const logout = (dispatch) => {
    return useCallback(() => {
        dispatch({ type: authAction.LOGOUT.REQUEST });

        try {
            removeState(STORE_NAME);
            dispatch({ type: authAction.LOGOUT.SUCCESS });
        } catch (error) {
            dispatch({ type: authAction.LOGOUT.FAIL });
        }
    }, [dispatch]);
};
