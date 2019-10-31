import { call, put, select } from 'redux-saga/effects';
import HTTP from '@/httpService';
import { AnyAction } from 'redux';

import API from '@/routing/api';
import { getUserCardList } from '@/selectors/businessCard';

import { 
    createNotifyAction,
    setCardListAction,
    setResponseAction
} from '@/actions';

export function* removeCard({ payload }: AnyAction) {
    const { id, component } = payload;

    const body = { id };

    try {
        yield(call(HTTP, 'POST', API.businessCard.remove, body, true));

        yield put(setResponseAction({ component, name, status: 200 }));

        yield put(createNotifyAction('success_card_remove'));

        const cards = yield select(getUserCardList);

        const newCards = cards.filter(item => item.id !== id);
        
        yield put(setCardListAction(newCards));

    } catch (err) {
        const { message } = err;

        if (message) {
            yield put(createNotifyAction(message));
        }
    }
}
