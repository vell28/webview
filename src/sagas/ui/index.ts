import { takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import * as types from '@/actions';
import { setNotification } from './setNotification';
import { setLoader } from './setLoader';

export default function* (): SagaIterator {
    yield takeEvery(types.CREATE_NOTIFICATION, setNotification);
    yield takeEvery(types.GET_LOADER, setLoader);
}
