import { takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import * as types from '@/actions';
import { getProducts } from './getProducts';

export default function* (): SagaIterator {
    yield takeEvery(types.GET_PRODUCTS, getProducts);
}
