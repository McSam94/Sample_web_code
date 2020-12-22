import {
    ArrowDown,
    DarkArrowDown,
    Close,
    DarkClose,
    Exclamation,
    DarkExclamation,
    Info,
    DarkInfo,
    Check,
    DarkCheck,
} from 'Icons';

export default (name, isDarkMode) => {
    switch (name) {
        case 'arrow-down':
            return isDarkMode ? DarkArrowDown : ArrowDown;
        case 'close':
            return isDarkMode ? DarkClose : Close;
        case 'exclamation':
            return isDarkMode ? DarkExclamation : Exclamation;
        case 'info':
            return isDarkMode ? DarkInfo : Info;
        case 'check':
            return isDarkMode ? DarkCheck : Check;
        default:
            return undefined;
    }
};
