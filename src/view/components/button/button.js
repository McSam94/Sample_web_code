import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import './button.scss';

const ButtonDiv = memo(({ onClick, className, children, primary, secondary, testId, ...props }) => {
    return (
        <button
            data-testid={testId ?? 'button-container'}
            className={cn(
                'met-button',
                {
                    'met-button--primary': primary,
                    'met-button--secondary': secondary,
                },
                className,
            )}
            onClick={onClick}
            {...props}
        >
            {typeof children === 'string' ? (
                <span data-testid='button-text'>{children.toUpperCase()}</span>
            ) : (
                children
            )}
        </button>
    );
});

ButtonDiv.propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
    link: PropTypes.string,
    onClick: PropTypes.func,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    testId: PropTypes.string,
};

ButtonDiv.defaultProps = {
    primary: true,
    secondary: false,
};

const Button = ({ link, ...props }) => {
    return (
        <>
            {link ? (
                <Link className='met-button__link' to={link}>
                    <ButtonDiv {...props} />
                </Link>
            ) : (
                <ButtonDiv {...props} />
            )}
        </>
    );
};

Button.propTypes = {
    link: PropTypes.string,
};

export default memo(Button);
