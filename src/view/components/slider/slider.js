import React, { forwardRef, memo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import RCSlider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './slider.scss';

// References : https://github.com/react-component/slider

const Slider = forwardRef(({ className, max, min, unit, ...props }, ref) => {
    return (
        <div className={cn('met-slider', className)} ref={ref}>
            <RCSlider max={max} min={min} {...props} />
            <div className='met-slider__description'>
                <span className='met-slider__description-min'>{`${min}${unit ?? ''}`}</span>
                <span className='met-slider__description-max'>{`${max}${unit ?? ''}`}</span>
            </div>
        </div>
    );
});

Slider.propTypes = {
    className: PropTypes.string,
    max: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    unit: PropTypes.string,
};

export default memo(Slider);
