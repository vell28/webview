import { call, put, select, delay, cancel, fork } from 'redux-saga/effects';
import HTTP from '@/httpService';
import { AnyAction } from 'redux';
import * as R from 'ramda';

import API from '@/routing/api';
import { history } from '@/index';
import routers from '@/routing/constants';
import { getUserCardList } from '@/selectors/businessCard';
import { 
    startProgressAction,
    setCardListAction,
    createNotifyAction,
    receivedProgressAction
} from '@/actions';
import startProgress from '@/sagas/ui/progress';
import { deleteKeys } from '@/utils';

export function* updateCard({ payload }: AnyAction) {
    const { body, totalFiles } = payload;

    let template = R.clone(body);
    let curTime;
    let startTime = 20;

    template = deleteKeys(template);
    
    const task = yield fork(startProgress);

    if (!totalFiles || totalFiles < 2) {
        yield put(startProgressAction());
    }

    if (totalFiles > 2) {
        curTime = (100 - 20) / totalFiles;
        startTime = curTime + startTime;

        yield put(startProgressAction(curTime));
    }
    
    try {
        const temp = Object.keys(template.schema);
        let i = 0;

        while(i < temp.length - 1) {
            if (template.schema[temp[i]].placeHolder) {
                delete template.schema[temp[i]]['placeHolder'];
            }

            if (template.schema[temp[i]].value.files) {

                const formData = new FormData();
                const file = template.schema[temp[i]].value.files[0];

                formData.append('file', file);
                formData.append('tags', `${temp[i]};gvwu`);

                const { data } = yield(call(HTTP, 'POST', `${API.storage.upload}`, formData, true));

                template.schema[temp[i]].value = data.id;

                if (curTime) {
                    startTime = startTime + curTime;
                    yield delay(400);
                    yield put(startProgressAction(startTime));
                }
            }
            i++;
        }

        yield(call(HTTP, 'POST', `${API.businessCard.update}`, template, true));

        const { id } = body;
        const list = yield select(getUserCardList);
        
        const data = list.map(item => {
            if(item.id === id) {
                item = { ...body };
                item.schema = { ...body.schema }
            }

            return item;
        });
        
        if (!curTime) {
            yield delay(3700);
        }

        yield put(setCardListAction(data));
        yield put(createNotifyAction('success_card_edit'));
        
        history.push(`${routers.createBusinessCard}?update`);
        
    } catch (err) {
        const { message } = err;

        yield put(createNotifyAction(message));

    } finally {

        yield cancel(task);
        yield put(receivedProgressAction(-1));
    }
}
