import { call, put } from 'redux-saga/effects';
import HTTP from '@/httpService';
import { AnyAction } from 'redux';
import { store } from '@/index';
import { push } from 'react-router-redux'

import { GetForgotPassword } from '@/models';
import API from '@/routing/api';
import { setResponseAction, createNotifyAction } from '@/actions';
import routers from '@/routing/constants';

export function* restorePass({ payload }: AnyAction | GetForgotPassword) {
    const { token, password, component, name } = payload;
    
    const body = { token, password };

    try {

        yield(call(HTTP, 'POST', API.passChange, body));

        store.dispatch(push(routers.logIn));
    } catch (err) {
        const { message } = err;

        yield put(createNotifyAction(message));
        yield put(setResponseAction({ component, name }));
    }
}
