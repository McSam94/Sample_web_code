import { ArrowDown, DarkArrowDown, Close, DarkClose } from 'Icons';

export default (name, isDarkMode) => {
    switch (name) {
        case 'arrow-down':
            return isDarkMode ? DarkArrowDown : ArrowDown;
        case 'close':
            return isDarkMode ? DarkClose : Close;
        default:
            return undefined;
    }
};
