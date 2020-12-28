import Axios from 'axios';
import { getInitialState } from 'Utils';

const apiClient = Axios.create({
    baseURL: 'https://mfp.metadd-sda.net/v1/tenants/GTO/',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Headers':
            'Origin, Content-Type, Access-Control-Allow-Headers, Authorization, X-Auth-Token',
        'Content-Type': 'application/json',
        crossDomain: true,
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const { token } = getInitialState('AuthStore') ?? { token: '' };

        if (token) {
            return {
                ...config,
                headers: {
                    ...config.headers,
                    Authorization: `Bearer ${token}`,
                },
            };
        } else {
            return config;
        }
    },
    (error) => Promise.reject(error),
);

const { get, post } = apiClient;
export { get, post };
