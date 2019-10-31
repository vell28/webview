import { call, put } from 'redux-saga/effects';
import HTTP from '@/httpService';
import { AnyAction } from 'redux';

import { GetForgotPassword } from '@/models';
import API from '@/routing/api';
import { setResponseAction, createNotifyAction } from '@/actions';

export function* forgotPass({ payload }: AnyAction | GetForgotPassword) {
    const { email, component } = payload;

    const body = { email };

    try {

        yield(call(HTTP, 'POST', API.passRestore, body));

        yield put(setResponseAction({ component, status: 200 }));

    } catch (err) {
        const { message } = err;

        yield put(createNotifyAction(message));
        yield put(setResponseAction({ component, status: 400 }));
    }
}
