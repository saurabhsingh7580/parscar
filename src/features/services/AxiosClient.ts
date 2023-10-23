import axios, { AxiosClient } from 'axios';
import { Alert } from 'react-native';

/**
 * @params Url
 * @params medthod POST,GET
 * @params params
 */

const AxiosClient = async (uri, method, params, isformData, token) => {
    const headersMap = new AxiosHeaders();
    const body = params;
    headersMap.clear();
    headersMap.setAccept('application/json');
    headersMap.setContentType(
        isformData ? 'multipart/form-data' : 'application/json',
    );
    if (token) {
        headersMap.Authorization = token;
    }

    const request = {
        Url,
        method,
        headers: headersMap,
    };

    if (body != null) {
        request.data = body;
    }
    return new Promise((success, reject) => {
        console.log(request, '*********** Request ************ ');
        axios(request)
            .then(response => {
                console.log(response, '*********** Response ************');
                if (response.status === 200) {
                    const apiResponse = response?.data;
                    if (apiResponse) {
                        if (apiResponse.status) {
                            success(apiResponse);
                        } else {
                            reject(apiResponse.message);
                        }
                    }
                }
            })
            .catch(error => {
                if (error.message === 'Network Error') {
                    Alert.alert(error.message);
                    return;
                }
                if (error.message === 'Request failed with status code 401') {
                    Alert.alert(
                        'Authentication Fail',
                        'System fail to verify your Creditials',
                    ),
                        [
                            {
                                text: 'Logout',
                            },
                        ];
                    return;
                }
                reject(error);
            });
    });
};

export default AxiosClient;
