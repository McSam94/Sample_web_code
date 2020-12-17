import { ArrowDown, DarkArrowDown } from 'Icons';

export default (name, isDarkMode) => {
    switch (name) {
        case 'arrow-down':
            return isDarkMode ? DarkArrowDown : ArrowDown;
        default:
            return undefined;
    }
};
