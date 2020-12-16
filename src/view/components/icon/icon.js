import React, { memo } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import GetIcon from './import';
import './icon.scss';

const Icon = ({ name, className }) => {
    return <img className={cn('met-icon', className)} src={GetIcon(name)} alt={name} />;
};

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default memo(Icon);
