import { get } from './base';

const CommonSrv = {
    version: (token) => get('version', { cancelToken: token }),
};

export default CommonSrv;
