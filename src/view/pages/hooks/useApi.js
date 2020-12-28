import { useEffect } from 'react';
import Axios from 'axios';

export const useApi = (apiCall) => {
    useEffect(() => {
        const source = Axios.CancelToken.source();
        apiCall(source.token);

        return () => source.cancel();
    }, [apiCall]);
};
