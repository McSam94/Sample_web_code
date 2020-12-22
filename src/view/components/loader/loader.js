import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './loader.scss';

const Loader = ({ isLoading, className }) => {
    if (!isLoading) return null;

    return (
        <div className={cn('met-loader', className)}>
            {[...new Array(12)].map((num, idx) => (
                <div key={idx} className='met-loader__spinner'></div>
            ))}
        </div>
    );
};

Loader.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    className: PropTypes.string,
};

Loader.defaultProps = {
    isLoading: true,
};

export default memo(Loader);
