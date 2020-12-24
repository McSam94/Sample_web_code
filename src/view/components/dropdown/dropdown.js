import React, { forwardRef, memo, useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import Icon from '../icon/icon';
import { useOnClickOutside } from '../hooks';
import './dropdown.scss';

const Dropdown = forwardRef(
    (
        {
            className,
            items,
            label,
            value,
            error,
            outline,
            underline,
            autoComplete,
            onChange,
            testId,
        },
        ref,
    ) => {
        const { t } = useTranslation();
        const [selectedValue, setSelectedValue] = useState(value ?? '');
        const [shouldOpen, setshouldOpen] = useState(false);
        const [filteredItems, setFilteredItems] = useState(items);
        const [inputValue, setInputValue] = useState(
            filteredItems.find((item) => item.value === value)?.label ?? '',
        );
        const iconRef = useRef(null);

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

        const onTextChange = useCallback((event) => {
            setInputValue(event.target.value);
        }, []);

        const closeDropdown = () => {
            if (inputValue === '') {
                setInputValue(items.find((item) => item.value === selectedValue).label ?? '');
            }

            if (shouldOpen) {
                toggleDropdown();
            }
        };

        const shouldIgnore = (event) => {
            const path = event.path ?? event.composedPath?.();

            return (
                !iconRef.current?.contains(path?.[0]) &&
                !path?.[0]?.className.includes('met-dropdown__list-item')
            );
        };

        useOnClickOutside(ref, closeDropdown, shouldIgnore);

        useEffect(() => {
            setshouldOpen(false);
        }, [selectedValue]);

        useEffect(() => {
            if (autoComplete) {
                setFilteredItems(
                    items?.filter((item) => item.label.match(new RegExp(inputValue, 'gi'))),
                );
            }
        }, [autoComplete, items, inputValue]);

        useEffect(() => {
            setInputValue(items.find((item) => item.value === selectedValue).label ?? '');
        }, [items, selectedValue]);

        return (
            <div
                ref={ref}
                data-testid={testId ?? 'dropdown-container'}
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
                    data-testid='dropdown-label'
                    className={cn('met-dropdown__label', {
                        'met-dropdown__label--error': error,
                    })}
                >
                    {label}
                </div>
                <div className='met-dropdown__container' onClick={toggleDropdown}>
                    <input
                        data-testid='dropdown-input'
                        className={cn('met-dropdown__input', {
                            'met-dropdown__input--disabled': !autoComplete,
                        })}
                        type='text'
                        value={inputValue}
                        onChange={onTextChange}
                    />
                    <Icon
                        ref={iconRef}
                        testId='dropdown-icon'
                        className={cn('met-dropdown__icon', {
                            'met-dropdown__icon--opened': shouldOpen,
                        })}
                        name='arrow-down'
                    />
                </div>
                <div
                    data-testid='dropdown-list'
                    className={cn('met-dropdown__list', {
                        'met-dropdown__list--opened': shouldOpen,
                    })}
                >
                    {filteredItems.length ? (
                        <>
                            {filteredItems.map((item, idx) => (
                                <div
                                    key={idx}
                                    className='met-dropdown__list-item'
                                    onClick={() => onItemClick(item.value)}
                                >
                                    {item.label}
                                </div>
                            ))}
                        </>
                    ) : (
                        <div className='met-dropdown__list-item met-dropdown__list-none'>
                            {t('components.dropdown.no-item')}
                        </div>
                    )}
                </div>
                {error && (
                    <span data-testid='dropdown-error' className='error'>
                        {error}
                    </span>
                )}
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
    autoComplete: PropTypes.bool,
    onChange: PropTypes.func,
    testId: PropTypes.string,
};

Dropdown.defaultProps = {
    outline: true,
    underline: false,
    autoComplete: false,
};

export default memo(Dropdown);
