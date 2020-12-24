import { useEffect } from 'react';

export const useOnClickOutside = (ref, handler, validationFn) => {
    useEffect(() => {
        const listener = (event) => {
            const path = event.path ?? event.composedPath?.();

            // When component is isolated (e.g, iframe, shadow DOM) event.target refers to whole container not the component. path[0] is the node that the event originated from, it does not need to walk the array
            if (!ref?.current?.contains(event.target) && !ref?.current?.contains(path && path[0])) {
                if (validationFn && !validationFn(event)) return;
                handler(event);
            }
        };

        if (!window.hasOwnProperty('cordova')) {
            document.addEventListener('mousedown', listener);
        } else {
            document.addEventListener('touchstart', listener);
        }

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler, validationFn]);
};
