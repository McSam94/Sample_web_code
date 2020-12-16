import { ArrowDown } from 'Icons';

export default (name) => {
    switch (name) {
        case 'arrow-down':
            return ArrowDown;
        default:
            return undefined;
    }
};
