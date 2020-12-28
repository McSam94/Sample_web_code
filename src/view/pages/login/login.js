import React, { memo, useCallback, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Input, Button } from 'Components';
import { AuthContext, UiContext } from 'Stores';
import { useApi } from '../hooks';
import './login.scss';

const Login = () => {
    const history = useHistory();
    const { t } = useTranslation();
    const { register, handleSubmit, errors } = useForm();
    const { login, token, isLoggingIn, isLoggedIn } = useContext(AuthContext);
    const { getVersion, version } = useContext(UiContext);
    const onSubmit = useCallback(({ username, password }) => login(username, password), [login]);

    useApi(getVersion);

    useEffect(() => {
        if (token) {
            history.push('/');
        }
    }, [token, history]);

    return (
        <div className='login'>
            <form className='login__container' onSubmit={handleSubmit(onSubmit)}>
                <Input
                    data-testid='login-username'
                    className='login__field'
                    name='username'
                    label={t('login.username')}
                    value=''
                    placeholder='Username'
                    ref={register({
                        required: t('login.validation.username'),
                    })}
                    error={errors.username?.message}
                    outline
                />
                <Input
                    data-testid='login-password'
                    className='login__field'
                    name='password'
                    label={t('login.password')}
                    type='password'
                    value=''
                    placeholder='Password'
                    ref={register({
                        required: t('login.validation.password'),
                    })}
                    error={errors.password?.message}
                    outline
                />
                {version && <p className='login__version'>v{version}</p>}
                <Button data-testid='login-button' className='login__button' type='submit'>
                    {isLoggingIn || isLoggedIn ? 'Logging In' : t('login.login')}
                </Button>
            </form>
        </div>
    );
};

export default memo(Login);
