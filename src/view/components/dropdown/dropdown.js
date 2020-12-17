import React, { forwardRef, memo, useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Icon from '../icon/icon';
import { useOnClickOutside } from '../hooks';
import './dropdown.scss';

const Dropdown = forwardRef(
    ({ className, items, label, value, error, outline, underline, onChange }, ref) => {
        const [selectedValue, setSelectedValue] = useState(value ?? '');
        const [shouldOpen, setshouldOpen] = useState(false);

        const onItemClick = useCallback(
            (value) => {
                setSelectedValue(value);
                if (onChange) onChange(value);
            },
            [onChange],
        );

        const toggleDropdown = useCallback(() => {
            setshouldOpen((prevState) => !prevState);
        }, []);

        const closeDropdown = useCallback(() => {
            if (shouldOpen) {
                toggleDropdown();
            }
        }, [shouldOpen, toggleDropdown]);

        useOnClickOutside(ref, closeDropdown);

        useEffect(() => {
            setshouldOpen(false);
        }, [selectedValue]);

        return (
            <div
                ref={ref}
                className={cn(
                    'met-dropdown',
                    {
                        'met-dropdown--outline': outline,
                        'met-dropdown--underline': underline,
                    },
                    className,
                )}
            >
                <div
                    className={cn('met-dropdown__label', {
                        'met-dropdown__label--error': error,
                    })}
                >
                    {label}
                </div>
                <div className='met-dropdown__container' onClick={toggleDropdown}>
                    <input
                        className='met-dropdown__input'
                        type='text'
                        value={items.find((item) => item.value === selectedValue)?.label}
                        onChange={() => {}}
                    />
                    <Icon
                        className={cn('met-dropdown__icon', {
                            'met-dropdown__icon--opened': shouldOpen,
                        })}
                        name='arrow-down'
                    />
                </div>
                <div
                    className={cn('met-dropdown__list', {
                        'met-dropdown__list--opened': shouldOpen,
                    })}
                >
                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            className='met-dropdown__list-item'
                            onClick={() => onItemClick(item.value)}
                        >
                            {item.label}
                        </div>
                    ))}
                </div>
            </div>
        );
    },
);

Dropdown.propTypes = {
    className: PropTypes.string,
    items: PropTypes.array,
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    value: PropTypes.string,
    outline: PropTypes.bool,
    underline: PropTypes.bool,
    onChange: PropTypes.func,
};

Dropdown.defaultProps = {
    outline: true,
    underline: false,
};

export default memo(Dropdown);
