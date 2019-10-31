import { delay, put, select } from 'redux-saga/effects';
import shortid from 'shortid';
import { AnyAction } from 'redux';

import { setNotifyAction } from '@/actions';
import { getNotify } from '@/selectors/ui'

export function* setNotification({ payload }: AnyAction) { 
    const time = 5000;
    const id = shortid.generate();

    const notify = { id, textId: payload.replace('.', '_') }

    let notifications = yield select(getNotify);

    notifications = notifications.slice();
    notifications.push(notify);

    yield put(setNotifyAction(notifications));
    yield delay(time);

    notifications = yield select(getNotify);

    notifications = notifications.filter(item => item.id !== id);

    yield put(setNotifyAction(notifications));
}
