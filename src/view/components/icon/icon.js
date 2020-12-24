import React, { forwardRef, memo, useContext } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { UiContext } from 'Stores';
import GetIcon from './import';
import './icon.scss';

const Icon = forwardRef(({ testId, name, className, onClick, isForceDarkMode, ...props }, ref) => {
    const { isDarkMode } = useContext(UiContext);

    return (
        <img
            ref={ref}
            data-testid={testId ?? 'icon-img'}
            onClick={onClick}
            className={cn('met-icon', className)}
            src={GetIcon(name, isForceDarkMode ?? isDarkMode)}
            alt={name}
            {...props}
        />
    );
});

Icon.propTypes = {
    testId: PropTypes.string,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
    isForceDarkMode: PropTypes.bool,
    onClick: PropTypes.func,
};

export default memo(Icon);
