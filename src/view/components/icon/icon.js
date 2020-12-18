import React, { forwardRef, memo, useContext } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { UiContext } from 'Stores';
import GetIcon from './import';
import './icon.scss';

const Icon = forwardRef(({ name, className, onClick }, ref) => {
    const { isDarkMode } = useContext(UiContext);

    return (
        <img
            ref={ref}
            onClick={onClick}
            className={cn('met-icon', className)}
            src={GetIcon(name, isDarkMode)}
            alt={name}
        />
    );
});

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

export default memo(Icon);
