import { post } from './base';

const AuthSrv = {
    login: (param) => post('authenticate', param),
};

export default AuthSrv;
