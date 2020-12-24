import { useReducerContext, getInitialState } from 'Utils';
import { toggleDarkMode, getVersion, toast, closeToast } from './ui-actions';
import { UIReducer } from './ui-reducer';

const STORE_NAME = 'UIStore';

// eslint-disable-next-line react-hooks/rules-of-hooks
export const { Context, Provider } = useReducerContext({
    reducer: UIReducer,
    actions: { toggleDarkMode, getVersion, toast, closeToast },
    initialState: getInitialState(STORE_NAME) || {
        isDarkMode: false,
        isGettingVersion: false,
        isGotVersion: false,
        version: '',
        isToastVisible: false,
        toastConfig: {},
    },
    displayName: STORE_NAME,
});
