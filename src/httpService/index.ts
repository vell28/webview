import axios from 'axios';
import * as R from 'ramda'; 

import { store } from '@/index';
import { 
    getUserLogged,
    getUserToken
} from '@/selectors/user';
import { logOutAction } from '@/actions/auth';
import { API } from '@/constants/url';

const blob = '/avatar/v1/get?'

const HTTP: any = async (method, url, body, auth) => {
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    };

    if(method === 'GET' && url.match(blob)) {
        defaultOptions['responseType'] = 'blob';
    }

    if(auth) {
        const token = getUserToken(store.getState());

        if(token) {
            defaultOptions.headers['Authorization'] = `Bearer ${token}`
        }
            
    } 

    const meth = method.toLowerCase();
    
    const _axios = axios.create(defaultOptions);

    try {
           
        return await _axios[ meth ](`${API}/${url}`, body);
        
    } catch(err) {
        const error = R.path([ 'response', 'data', 'error' ], err);
        
        if (error) {

            if((err.message && err.message.match(/401/)) || (err.response && err.response.status === 401)) {

                if (getUserLogged(store.getState())) {
                    
                    store.dispatch(logOutAction());
                    throw new Error(error);
                }
            }

            throw new Error(error);
        }

        if((err.message && err.message.match(/401/)) || (err.response && err.response.status === 401)) {
            getUserLogged(store.getState()) && store.dispatch(logOutAction());
        }

        throw new Error(err);
    }
};

export default HTTP;
