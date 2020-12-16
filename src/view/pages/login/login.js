import React, { memo, useCallback, useContext, useEffect } from 'react';
import Axios from 'axios';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Input, Button, Dropdown } from 'Components';
import { AuthContext, UiContext } from 'Stores';
import './login.scss';

const Login = () => {
    const history = useHistory();
    const { t, i18n } = useTranslation();
    const { register, handleSubmit, errors } = useForm();
    const { login, token } = useContext(AuthContext);
    const { getVersion, version } = useContext(UiContext);
    const onSubmit = useCallback(({ username, password }) => login(username, password), [login]);
    const updateLang = useCallback((value) => i18n.changeLanguage(value), [i18n]);

    useEffect(() => {
        const source = Axios.CancelToken.source();
        getVersion(source.token);

        return () => source.cancel();
    }, [getVersion]);

    useEffect(() => {
        if (token) {
            history.push('/');
        }
    }, [token, history]);

    return (
        <div className="login">
            <form className="login__container" onSubmit={handleSubmit(onSubmit)}>
                <Input
                    className="login__field"
                    name="username"
                    label={t('login.username')}
                    value="saikhuan"
                    placeholder="Username"
                    ref={register({
                        required: t('login.validation.username'),
                    })}
                    error={errors.username?.message}
                    outline
                />
                <Input
                    className="login__field"
                    name="password"
                    label={t('login.password')}
                    type="password"
                    value="password"
                    placeholder="Password"
                    ref={register({
                        required: t('login.validation.password'),
                    })}
                    error={errors.password?.message}
                    outline
                />

                {version && <p className="login__version">v{version}</p>}

                <Button className="login__button" type="submit">
                    {t('login.login')}
                </Button>
            </form>
        </div>
    );
};

export default memo(Login);
