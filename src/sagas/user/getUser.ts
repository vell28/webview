import { call, put, select, all } from 'redux-saga/effects';
import HTTP from '@/httpService';

import API from '@/routing/api';
import { setUserAction } from '@/actions';
import { getUserToken } from '@/selectors/user';
import { API as URL } from '@/constants/url';
import { AVATAR } from '@/constants/avatarTag';
import { getUserImage } from '@/utils/get-user-image';

export function* getUser() {
    
    const body = {
        verbosity: 'all'
    }

    try {
        const token = yield select(getUserToken);

        const [ user, images ] = yield all([
            yield call(HTTP, 'POST', API.getUser, body, true),
            yield call(HTTP, 'GET', `${API.storage.get}?${AVATAR}&token=${token}`, null)
        ]);
        
        const { data } = user;

        if (images && images.data[0]) {
            data['image'] = `${URL}/${API.storage.get}?token=${token}&id=${images.data[0].id}`;
        }

        if (!images.data[0]) {
            data['image'] = localStorage['userImage'] ? localStorage.getItem('userImage') : getUserImage();
        }

        yield put(setUserAction(data));
        
    } catch(error) {
        const { message } = error;

        console.log(message);
    }
}
