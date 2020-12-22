import React, { useContext, useCallback, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { UiContext, AuthContext } from 'Stores';
import { Button, Dropdown, Slider, Loader, Notification } from 'Components';
import './setting.scss';

const Setting = () => {
    const { toggleDarkMode } = useContext(UiContext);
    const { logout } = useContext(AuthContext);
    const { t, i18n } = useTranslation();
    const [isLoading, setIsLoading] = useState(true);

    const updateLang = useCallback((value) => i18n.changeLanguage(value), [i18n]);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    return (
        <div className='about'>
            <Link to='/'>⬅ back</Link>
            <Button primary className='about__darkmode about__element' onClick={toggleDarkMode}>
                {t('setting.dark-mode')}
            </Button>

            <Dropdown
                className='about__language about__element'
                items={[
                    {
                        label: 'English',
                        value: 'en',
                    },
                    {
                        label: 'Korean',
                        value: 'kr',
                    },
                ]}
                value={i18n.language}
                label='Language'
                onChange={updateLang}
            />

            <Slider className='about__element' min={0} max={100} unit='s' />

            <Notification
                className='about__element'
                message1='A payment on your dental policy is overdue.'
                message2={
                    <div>
                        Click <a href='/'>here</a> to make a payment
                    </div>
                }
                type='error'
            />

            <Loader isLoading={isLoading} />

            <Button primary className='about__logout about__element' onClick={logout}>
                {t('setting.logout')}
            </Button>
        </div>
    );
};

export default Setting;
