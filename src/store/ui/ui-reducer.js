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
        default:
            return state;
    }
};
