import { useReducerContext, getInitialState } from 'Utils';
import { toggleDarkMode, getVersion } from './ui-actions';
import { UIReducer } from './ui-reducer';

const STORE_NAME = 'UIStore';

// eslint-disable-next-line react-hooks/rules-of-hooks
export const { Context, Provider } = useReducerContext({
    reducer: UIReducer,
    actions: { toggleDarkMode, getVersion },
    initialState: getInitialState(STORE_NAME) || {
        isDarkMode: false,
        isGettingVersion: false,
        isGotVersion: false,
        version: '',
    },
    displayName: STORE_NAME,
});
