import React, { useContext, useCallback, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { UiContext, AuthContext } from 'Stores';
import { Button, Dropdown, Slider, Loader } from 'Components';
import './setting.scss';

const LANGUAGE = [
    {
        label: 'English',
        value: 'en',
    },
    {
        label: 'Korean',
        value: 'kr',
    },
];

const Setting = () => {
    const { toggleDarkMode, toast } = useContext(UiContext);
    const { logout } = useContext(AuthContext);
    const { t, i18n } = useTranslation();
    const [isLoading, setIsLoading] = useState(true);

    const updateLang = useCallback((value) => i18n.changeLanguage(value), [i18n]);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    const toastTest = useCallback(() => {
        toast({
            message1: 'A payment on your dental policy is overdue.',
            message2: 'Click {{here}} to make a payment',
            link: '/',
            type: 'error',
            position: 'bottom-right',
            duration: 2500,
        });
    }, [toast]);

    return (
        <div className='about'>
            <Link to='/'>⬅ back</Link>
            <Button
                primary
                data-testid='toggle-darkmode'
                className='about__darkmode about__element'
                onClick={toggleDarkMode}
            >
                {t('setting.dark-mode')}
            </Button>

            <Dropdown
                className='about__language about__element'
                items={LANGUAGE}
                value={i18n.language}
                label='Language'
                onChange={updateLang}
            />

            <Slider className='about__element' min={0} max={100} unit='s' />

            <Loader isLoading={isLoading} />

            <Button
                primary
                data-testid='toast-button'
                className='about__element'
                onClick={toastTest}
            >
                Toast
            </Button>

            <Button primary className='about__logout about__element' onClick={logout}>
                {t('setting.logout')}
            </Button>
        </div>
    );
};

export default Setting;
