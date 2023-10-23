import AxiosClient from './AxiosClient';

import { API_CALL_METHOD_TYPE } from '../../utils/enum';
import { Alert } from 'react-native';


const ApiManager = {
    /***
     * @param Url
     * @param type
     */


    getRequestApi: async (Url: type) => {
        AxiosClient(Url, API_CALL_METHOD_TYPE.GET, null, false, type)
            .then(response => response)
            .catch(error => console.error())
        )
    }


    postRequestApi: async (Url: type) => {
        AxiosClient(Url, API_CALL_METHOD_TYPE.POST, null, false, type)
            .then(response => response)
            .catch(error => console.error())
        )
    }
}

export default ApiManager;