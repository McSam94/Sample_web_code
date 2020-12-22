import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Icon from '../icon/icon';
import './notification.scss';

const Notification = ({ className, type, message1, message2 }) => {
    const [isVisible, setIsVisible] = useState(true);

    const closeNotification = () => {
        setIsVisible(false);
    };

    return (
        <div
            className={cn(
                'met-notification',
                {
                    'met-notification--error': type === 'error',
                    'met-notification--info': type === 'info',
                    'met-notification--feedback': type === 'feedback',
                    'met-notification--invisible': !isVisible,
                },
                className,
            )}
        >
            <div className='met-notification__message'>
                <div className='met-notification__text'>{message1}</div>
                {message2}
            </div>
            <Icon
                className='met-notification__close'
                name='close'
                isForceDarkMode
                onClick={closeNotification}
            />
        </div>
    );
};

Notification.propTypes = {
    className: PropTypes.string,
    message1: PropTypes.string.isRequired,
    message2: PropTypes.element,
    type: PropTypes.oneOf(['error', 'info', 'feedback']),
};

export default memo(Notification);
