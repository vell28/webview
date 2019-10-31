import { call, put } from 'redux-saga/effects';
import HTTP from '@/httpService';
import { AnyAction } from 'redux';

import API from '@/routing/api';
import { 
    setProductsAction,
    createNotifyAction
} from '@/actions';

export function* getProducts({}: AnyAction) {
    try {
        const { data } = yield(call(HTTP, 'GET', API.products));

        yield put(setProductsAction(data));

    } catch (err) {
        const { message } = err;

        yield put(createNotifyAction(message))

    }
}
