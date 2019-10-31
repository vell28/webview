import { call, put, select, delay } from 'redux-saga/effects';
import HTTP from '@/httpService';
import { AnyAction } from 'redux';
import API from '@/routing/api';

import { createNotifyAction, getLoaderAction } from '@/actions';
import { getUserEmail } from '@/selectors/user';
import { getLocale } from '@/selectors/locale';

export function* exportCard({ payload }: AnyAction) {
    const { idcard, name } = payload;
    
    yield put(getLoaderAction(name));

    const email = yield select(getUserEmail);

    let mess = 'success_card_export';

    const locale = yield select(getLocale);

    const body = { email, idcard, lang: locale };

    try {
        yield(call(HTTP, 'POST', API.businessCard.export, body, true));
        
    } catch (err) {
        const { message } = err;
        mess = message;

    } finally {
        yield put(createNotifyAction(mess));
        yield put(getLoaderAction(name));
    }
}
