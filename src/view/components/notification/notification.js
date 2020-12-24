import React, { memo, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { UiContext } from 'Stores';
import Icon from '../icon/icon';
import './notification.scss';

const Notification = ({ className, testId }) => {
    const { isToastVisible, toastConfig, closeToast } = useContext(UiContext);
    const isBottom = toastConfig?.position?.includes('bottom');
    const isTop = toastConfig?.position?.includes('top');
    const isMobile = window.hasOwnProperty('cordova');

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

    const processSubtext = useCallback(
        (subtext) => {
            const prefix = subtext?.substring(0, subtext?.indexOf('{{'));
            const link = subtext?.substring(subtext?.indexOf('{{') + 2, subtext?.indexOf('}}'));
            const suffix = subtext?.substring(subtext?.indexOf('}}') + 2, subtext?.length);

            return (
                <>
                    {prefix}{' '}
                    <a
                        data-testid='notification-link'
                        className='met-notification__link'
                        href={toastConfig?.link}
                    >
                        {link}
                    </a>{' '}
                    {suffix}
                </>
            );
        },
        [toastConfig],
    );

    return (
        <div
            data-testid={testId ?? 'notification-container'}
            className={cn(
                'met-notification',
                `met-notification--${toastConfig?.position ?? 'bottom-right'}`,
                {
                    'met-notification--mobile': isMobile,
                    'met-notification--error': toastConfig?.type === 'error',
                    'met-notification--info': toastConfig?.type === 'info',
                    'met-notification--feedback': toastConfig?.type === 'feedback',
                    'met-notification__top': isTop,
                    'met-notification__bottom': isBottom,
                    'met-notification--invisible': !isToastVisible,
                    'met-notification--visible': isToastVisible,
                },
                className,
            )}
        >
            {isMobile ? (
                <div className='met-notification__container'>
                    <Icon
                        data-testid='notification-icon'
                        name={getIconType(toastConfig?.type)}
                        className='met-notification__icon'
                        isForceDarkMode
                    />
                    <div className='met-notification__content'>
                        <div className='met-notification__message--mobile'>
                            <div
                                data-testid='notification-message1'
                                className='met-notification__text met-notification__text--mobile'
                            >
                                {toastConfig?.message1}
                            </div>
                            <div
                                data-testid='notification-message2'
                                className='met-notification__subtext'
                            >
                                {processSubtext(toastConfig?.message2)}
                            </div>
                        </div>
                        <Icon
                            data-testid='notification-close'
                            className='met-notification__close'
                            name='close'
                            isForceDarkMode
                            onClick={closeToast}
                        />
                    </div>
                </div>
            ) : (
                <>
                    <div data-testid='notification-message' className='met-notification__message'>
                        <Icon
                            data-testid='notification-icon'
                            name={getIconType(toastConfig?.type)}
                            className='met-notification__icon'
                            isForceDarkMode
                        />
                        <div data-testid='notification-message1' className='met-notification__text'>
                            {toastConfig?.message1}
                        </div>

                        <div
                            data-testid='notification-message2'
                            className='met-notification__subtext'
                        >
                            {processSubtext(toastConfig?.message2)}
                        </div>
                    </div>
                    <Icon
                        data-testid='notification-close'
                        className='met-notification__close'
                        name='close'
                        isForceDarkMode
                        onClick={closeToast}
                    />
                </>
            )}
        </div>
    );
};

Notification.propTypes = {
    className: PropTypes.string,
    message1: PropTypes.string,
    message2: PropTypes.string,
    link: PropTypes.string,
    type: PropTypes.oneOf(['error', 'info', 'feedback']),
    testId: PropTypes.string,
};

export default memo(Notification);
