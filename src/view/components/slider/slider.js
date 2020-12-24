import React, { forwardRef, memo, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import RCSlider, { Handle } from 'rc-slider';
import 'rc-slider/assets/index.css';
import './slider.scss';

// References : https://github.com/react-component/slider

const Slider = forwardRef(
    ({ className, max, min, unit, value, error, onChange, ...props }, ref) => {
        const [currentValue, setCurrentValue] = useState(value ?? 0);
        const [valuePosition, setValuePosition] = useState(0);

        const onSlide = useCallback(
            (slideValue) => {
                setCurrentValue(slideValue);
                if (onChange) {
                    onChange(slideValue);
                }
            },
            [onChange],
        );

        useEffect(() => {
            setValuePosition(Math.round((currentValue / (max - min)) * 100));
        }, [currentValue, max, min]);

        return (
            <div data-testid='slider-container' className={cn('met-slider', className)} ref={ref}>
                <div className='met-slider__value-container'>
                    <span
                        data-testid='slider-value'
                        className='met-slider__value'
                        style={{
                            left: `${valuePosition}%`,
                        }}
                    >
                        {`${currentValue}${unit}`}
                    </span>
                </div>
                <RCSlider
                    max={max}
                    min={min}
                    value={currentValue}
                    handle={({ className, dragging, ...handleProps }) => (
                        <Handle
                            data-testid='slider-handler'
                            className={cn('met-slider__handler', className)}
                            dragging={dragging.toString()}
                            {...handleProps}
                        >
                            <div className='met-slider__handler-dot' />
                        </Handle>
                    )}
                    onChange={onSlide}
                    trackStyle={{ backgroundColor: '#0061a0', height: '0.8rem' }}
                    railStyle={{ height: '0.8rem' }}
                    {...props}
                />
                <div className='met-slider__description'>
                    <span
                        data-testid='slider-min'
                        className='met-slider__description-min'
                    >{`${min}${unit ?? ''}`}</span>
                    {error && (
                        <span data-testid='slider-error' className='error'>
                            {error}
                        </span>
                    )}
                    <span
                        data-testid='slider-max'
                        className='met-slider__description-max'
                    >{`${max}${unit ?? ''}`}</span>
                </div>
            </div>
        );
    },
);

Slider.propTypes = {
    className: PropTypes.string,
    max: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    onChange: PropTypes.func,
    value: PropTypes.number,
    unit: PropTypes.string,
    error: PropTypes.string,
};

export default memo(Slider);
