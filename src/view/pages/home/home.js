import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Sample } from 'Images';
import { Button } from 'Components';
import './home.scss';

const Home = () => {
    const { t } = useTranslation();

    return (
        <div className="home">
            {/* <h1 className="home__title">Home</h1> */}
            <img className="home__image" src={Sample} alt="sample image" />
            <h1 className="home__title">{t('home.title', { framework: 'Remix' })}</h1>
            <Button link="/setting" primary>
                Setting
            </Button>
        </div>
    );
};

export default memo(Home);
