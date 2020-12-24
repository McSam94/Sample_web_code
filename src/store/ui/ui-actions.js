/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback } from 'react';
import { createRequestAction, RESPONSE_STATUS } from 'Utils';
import { CommonSrv } from 'Services';

export const uiAction = Object.freeze({
    TOGGLE_DARK_MODE: 'toggleDarkMode',
    TOAST: createRequestAction('toast'),
    VERSION: createRequestAction('version'),
});

export const toggleDarkMode = (dispatch) => {
    return useCallback(() => {
        dispatch({ type: uiAction.TOGGLE_DARK_MODE });
    }, [dispatch]);
};

export const getVersion = (dispatch) => {
    return useCallback(
        async (token) => {
            dispatch({ type: uiAction.VERSION.REQUEST });

            try {
                const result = await CommonSrv.version(token);

                if (result?.status === RESPONSE_STATUS.SUCCESS) {
                    dispatch({
                        type: uiAction.VERSION.SUCCESS,
                        params: {
                            version: result?.data?.version,
                        },
                    });
                } else {
                    dispatch({ type: uiAction.VERSION.FAIL });
                }
            } catch (error) {
                dispatch({ type: uiAction.VERSION.FAIL });
            }
        },
        [dispatch],
    );
};

export const toast = (dispatch) => {
    return useCallback(
        (toastConfig) => {
            dispatch({
                type: uiAction.TOAST.REQUEST,
                params: {
                    toastConfig,
                },
            });

            try {
                setTimeout(() => {
                    dispatch({
                        type: uiAction.TOAST.SUCCESS,
                    });
                }, toastConfig?.duration ?? 1500);
            } catch (error) {
                dispatch({ type: uiAction.TOAST.FAIL });
            }
        },
        [dispatch],
    );
};

export const closeToast = (dispatch) => {
    return useCallback(
        () =>
            dispatch({
                type: uiAction.TOAST.SUCCESS,
            }),
        [dispatch],
    );
};
