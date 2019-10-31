import { call, put, select } from 'redux-saga/effects';
import HTTP from '@/httpService';
import { AnyAction } from 'redux';

import URL from '@/routing/api';
import { setTemplateAction } from '@/actions';
import { getLocale } from '@/selectors/locale';
import { getUserToken } from '@/selectors/user';
import { addImageLink } from '@/utils';

export function* getTemplate({ }: AnyAction) {
    
    const locale = yield select(getLocale);
    
    try {
        const { data } = yield(call(HTTP, 'GET', `${URL.businessCard.getTemplate}?lang=${locale}`));
            
        const token = yield select(getUserToken); 

        yield put(setTemplateAction(
            addImageLink(data, token)
        ));

    } catch (err) {
        console.log(err);

        /*const { message } = err;

        yield put(createNotifyAction(message));*/
    }
}
