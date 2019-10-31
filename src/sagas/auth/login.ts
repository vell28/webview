import { call, put } from 'redux-saga/effects';
import HTTP from '@/httpService';
import { AnyAction } from 'redux';

import { GetLogin } from '@/models';
import API from '@/routing/api';
import { 
    setResponseAction,
    setUserAction,
    createNotifyAction
} from '@/actions';

export function* login({ payload }: AnyAction | GetLogin) {
    const { email, password, checked, component, name } = payload;

    const body = { login: email, password };

    try {
        const { data } = yield(call(HTTP, 'POST', API.login, body));
        const { token } = data; 
        
        yield put(setUserAction({ isLogged: true, token }));
    
        if(checked && token) {
            localStorage.setItem('token', token);
        }

    } catch (err) {

        const { message } = err;

        yield put(createNotifyAction(message));
        yield put(setResponseAction({ component, name }));
    }
}
