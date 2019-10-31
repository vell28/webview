import { delay, put, select } from 'redux-saga/effects';
import { AnyAction } from 'redux';

import { receivedProgressAction } from '@/actions';
import { getProgressBar } from '@/selectors/ui';

export function* reciveProgress({ payload }: AnyAction) {
    let progress = 0;
    if (payload && payload > 0) {

        progress = yield select(getProgressBar);

        const time = 1000 / payload;

        while(progress <= payload) {

            yield delay(time);
            yield put(receivedProgressAction(progress));

            progress++;
        }
    } else {
        const time = 2500 / 100;

        while(progress <= 100) {

            yield delay(time);
            yield put(receivedProgressAction(progress));

            progress++;
        }
    }
}
