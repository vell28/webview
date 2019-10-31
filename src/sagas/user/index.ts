import { takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import * as types from '@/actions';
import { getUser } from './getUser';
import { updateUser } from './updateUser';

export default function* (): SagaIterator {
    yield takeEvery(types.GET_USER, getUser);
    yield takeEvery(types.UPDATE_USER, updateUser);
}
