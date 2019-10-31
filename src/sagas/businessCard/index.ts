import { takeEvery, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import * as types from '@/actions';
import { createCard } from './createCard';
import { getCardsList } from './getCardsList';
import { getTemplate } from './getTemplate';
import { updateCard } from './updateCard';
import { exportCard } from './exportCard';
import { removeCard } from './removeCard';

export default function* (): SagaIterator {
    yield takeEvery(types.CREATE_BUSINESS_CARD, createCard);
    yield takeEvery(types.GET_CARD_LIST, getCardsList);
    yield takeEvery(types.GET_FORM_TEMPLATE, getTemplate);
    yield takeEvery(types.UPDATE_BUSINESS_CARD, updateCard);
    yield takeLatest(types.EXPORT_BUSINESS_CARD, exportCard);
    yield takeEvery(types.REMOVE_BUSINESS_CARD, removeCard);
}
