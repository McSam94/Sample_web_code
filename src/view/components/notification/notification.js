import React, { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Icon from '../icon/icon';
import './notification.scss';

const Notification = ({ className, type, message1, message2 }) => {
    const [isVisible, setIsVisible] = useState(true);

    const closeNotification = useCallback(() => {
        setIsVisible(false);
    }, []);

    const getIconType = useCallback((messageType) => {
        switch (messageType) {
            case 'error':
                return 'exclamation';
            case 'info':
                return 'info';
            case 'feedback':
                return 'check';
            default:
                return 'check';
        }
    }, []);

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
            {window.hasOwnProperty('cordova') ? (
                <div className='met-notification__container'>
                    <Icon
                        name={getIconType(type)}
                        className='met-notification__icon'
                        isForceDarkMode
                    />
                    <div className='met-notification__content'>
                        <div className='met-notification__message--mobile'>
                            <div className='met-notification__text met-notification__text--mobile'>
                                {message1}
                            </div>
                            {message2}
                        </div>
                        <Icon
                            className='met-notification__close'
                            name='close'
                            isForceDarkMode
                            onClick={closeNotification}
                        />
                    </div>
                </div>
            ) : (
                <>
                    <div className='met-notification__message'>
                        <Icon
                            name={getIconType(type)}
                            className='met-notification__icon'
                            isForceDarkMode
                        />
                        <div className='met-notification__text'>{message1}</div>
                        {message2}
                    </div>
                    <Icon
                        className='met-notification__close'
                        name='close'
                        isForceDarkMode
                        onClick={closeNotification}
                    />
                </>
            )}
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
