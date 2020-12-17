import React, { memo, useContext } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { UiContext } from 'Stores';
import GetIcon from './import';
import './icon.scss';

const Icon = ({ name, className }) => {
    const { isDarkMode } = useContext(UiContext);

    return <img className={cn('met-icon', className)} src={GetIcon(name, isDarkMode)} alt={name} />;
};

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default memo(Icon);
