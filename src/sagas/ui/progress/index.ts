import { takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import * as types from '@/actions';
import { reciveProgress } from './receivedProgressBar';

export default function* (): SagaIterator {
    yield takeEvery(types.START_PROGRESS, reciveProgress);
}
