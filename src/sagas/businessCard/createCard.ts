import { call, put, delay, select, fork, cancel } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import * as R from 'ramda';

import HTTP from '@/httpService';
import API from '@/routing/api';
import { history } from '@/index';
import { 
    startProgressAction,
    setCardListAction,
    createNotifyAction,
    receivedProgressAction
} from '@/actions';
import routers from '@/routing/constants';
import { getUserCardList } from '@/selectors/businessCard';
import startProgress from '@/sagas/ui/progress';
import { deleteKeys, updateImage } from '@/utils';
import { getUserToken } from '@/selectors/user';  

export function* createCard({ payload }: AnyAction) {
    const { template, templateColor, totalFiles } = payload;

    let curTime;
    let startTime = 20;
    let listTemplate = R.clone(template);

    listTemplate = deleteKeys(listTemplate);

    const task = yield fork(startProgress);

    if (totalFiles < 2) {
        yield put(startProgressAction());
    }

    if (totalFiles > 2) {
        curTime = (100 - 20) / totalFiles;
        startTime = curTime + startTime;

        yield put(startProgressAction(curTime));
    }

    try {
        const temp = Object.keys(listTemplate.schema);
        let i = 0;

        while(i < temp.length - 1) {
            if (listTemplate.schema[temp[i]].placeHolder) {
                delete listTemplate.schema[temp[i]]['placeHolder'];
            }

            if (listTemplate.schema[temp[i]].value.files) {

                const body = new FormData();
                const file = listTemplate.schema[temp[i]].value.files[0];

                body.append('file', file);
                body.append('tags', `${temp[i]};gvwu`);

                const { data } = yield(call(HTTP, 'POST', API.storage.upload, body, true));

                listTemplate.schema[temp[i]].value = data.id;

                if (curTime) {
                    startTime = startTime + curTime;
                    yield delay(100);
                    yield put(startProgressAction(startTime));
                }
            }
            i++;
        }

        const { data : { id } } = yield(call(HTTP, 'POST', API.businessCard.create, { ...listTemplate }, true));
        
        let list = yield select(getUserCardList);
            list = list.slice();
        
        if (!curTime) {
            yield delay(3700);
        }

        let newList = R.clone(template);
        const token = yield select(getUserToken);

        newList.id = id;
        newList.template = templateColor;
        newList = yield updateImage(newList, token);
    
        list.unshift(newList);

        yield put(setCardListAction(list));

        yield put(createNotifyAction('success_card_send'));

        history.push(`${routers.createBusinessCard}?update`);

    } catch (err) {
        const { message } = err;

        yield put(createNotifyAction(message));

    } finally {

        yield cancel(task);
        yield put(receivedProgressAction(-1));
    }
}
