import { call, put } from 'redux-saga/effects';
import HTTP from '@/httpService';
import { AnyAction } from 'redux';

import { GetSignUp } from '@/models';
import API from '@/routing/api';
import {
    setResponseAction,
    setUserAction,
    createNotifyAction
} from '@/actions';
import { API as URL } from '@/constants/url';
import { getUserImage } from '@/utils/get-user-image';

export function* signUp({ payload }: AnyAction | GetSignUp) {
    const { email, password, component, name } = payload;

    const body = {
        verification: {
            method: 'email',
            check: email
        },
        password
    };

    try {

        const { data } = yield call(HTTP, 'POST', API.signUp, body);
        
        const UserImage = getUserImage();
        const url = UserImage.replace(URL, '');
        
        yield put(setUserAction({ isLogged: true, token: data.token, image: UserImage }));

        const image = yield call(HTTP, 'GET', url);
        
        const file = new File(
            [ image.data ], 
            'avatar.png', 
            { type: 'image/png' }
        );

        const form = new FormData();

        form.append('file', file);
        form.append('tags', 'avatar');
        form.append('internal', 'true');

        yield call(HTTP, 'POST', API.storage.upload, form, true);

    } catch(err) {
        const { message } = err;

        yield put(createNotifyAction(message));
        yield put(setResponseAction({ component, name, status: 400 }));
    }
}
