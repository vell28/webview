import { call, put, select, fork, cancel, delay } from 'redux-saga/effects';
import HTTP from '@/httpService';
import { AnyAction } from 'redux';

import API from '@/routing/api';
import { API as URL } from '@/constants/url';
import { 
    setUserAction,
    setResponseAction,
    createNotifyAction,
    startProgressAction,
    receivedProgressAction
} from '@/actions';
import { getUserToken } from '@/selectors/user';
import startProgress from '@/sagas/ui/progress';

export function* updateUser({ payload }: AnyAction) {
    const { body, component, name } = payload;

    let url;
    let task;
    let image;
    let response;

    if (body.password) {
        url = API.changePassword;
    };

    if (Object.keys(body).length && !url) {
        url = API.userUpdate;
    }
    if (!url) {
        url = `${API.storage.upload}`;
        image = true;

        task = yield fork(startProgress);

        yield put(startProgressAction());
    }

    try {

        const { data } = yield call(HTTP, 'POST', url, body, true);
        
        const user = {}

        if (url !== API.storage.upload) {
            Object.keys(body).forEach(item => user[item] = body[item]);
        }

        if (url === API.storage.upload) {
            const { id } = data;
            const token = yield select(getUserToken);

            user['image'] = `${URL}/${API.storage.get}?token=${token}&id=${id}`;
        }

        if (image) {
            yield delay(3700);
        }

        response = 'success_profile_updated';
        yield put(setUserAction(user));
        yield put(setResponseAction({ component, filedName: name, status: 200 }));

    } catch (error) {
        const { message } = error;
        response = message;

        yield put(setResponseAction({ component, filedName: name, status: 400 }));
    } finally {

        if (image) {
            yield cancel(task);
            yield put(receivedProgressAction(-1));
        }

        yield put(createNotifyAction(response));
    }
}
