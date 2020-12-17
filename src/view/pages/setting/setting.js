import React, { useContext, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { UiContext, AuthContext } from 'Stores';
import { Button, Dropdown, Slider } from 'Components';
import './setting.scss';

const Setting = () => {
    const { toggleDarkMode } = useContext(UiContext);
    const { logout } = useContext(AuthContext);
    const { t, i18n } = useTranslation();

    const updateLang = useCallback((value) => i18n.changeLanguage(value), [i18n]);

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

            <Slider className='about__element' min={1} max={100} unit='s' />

            <Button primary className='about__logout about__element' onClick={logout}>
                {t('setting.logout')}
            </Button>
        </div>
    );
};

export default Setting;
