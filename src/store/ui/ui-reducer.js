import { uiAction } from './ui-actions';

export const UIReducer = (state, action) => {
    switch (action.type) {
        case uiAction.TOGGLE_DARK_MODE:
            return {
                ...state,
                isDarkMode: !state.isDarkMode,
            };
        case uiAction.VERSION.REQUEST:
            return {
                ...state,
                isGettingVersion: true,
            };
        case uiAction.VERSION.SUCCESS:
            return {
                ...state,
                isGettingVersion: false,
                isGotVersion: true,
                version: action?.params?.version,
            };
        case uiAction.VERSION.FAIL:
            return {
                ...state,
                isGettingVersion: false,
                isGotVersion: false,
            };
        case uiAction.TOAST.REQUEST:
            return {
                ...state,
                isToastVisible: true,
                toastConfig: action?.params?.toastConfig,
            };
        case uiAction.TOAST.SUCCESS:
            return {
                ...state,
                isToastVisible: false,
            };
        case uiAction.TOAST.FAIL:
            return {
                ...state,
                isToastVisible: false,
                toastConfig: {},
            };
        default:
            return state;
    }
};
