import React, { useCallback, useState, forwardRef, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './input.scss';

const Input = forwardRef(
    ({ className, label, placeholder, error, outline, underline, value, ...props }, ref) => {
        const [isFocus, setIsFocus] = useState(false);
        const [inputValue, setInputValue] = useState(value);

        const onFocusToggle = useCallback((flag) => {
            setIsFocus(flag);
        }, []);

        const onTextChange = useCallback((event) => {
            setInputValue(event.target.value);
        }, []);

        useEffect(() => {
            setInputValue(value);
        }, [value]);

        return (
            <div className={cn('met-input', className)}>
                <div
                    className={cn('met-input__container', {
                        'met-input--outline': outline,
                        'met-input--underline': underline,
                        'met-input--error': error,
                    })}
                >
                    <div
                        className={cn('met-input__label', {
                            'met-input__label--focused': isFocus || inputValue,
                            'met-input__label--error': error,
                        })}
                    >
                        {label}
                    </div>
                    <input
                        ref={ref}
                        className={cn('met-input__field', {
                            'met-input__field--focused': isFocus,
                        })}
                        value={inputValue}
                        placeholder={isFocus ? placeholder : ''}
                        onFocus={() => onFocusToggle(true)}
                        onBlur={() => onFocusToggle(false)}
                        onChange={onTextChange}
                        {...props}
                    />
                </div>
                {error && <span className="error">{error}</span>}
            </div>
        );
    },
);

Input.propTypes = {
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string,
    outline: PropTypes.bool,
    underline: PropTypes.bool,
};

Input.defaultProps = {
    outline: true,
    underline: false,
};

export default memo(Input);
