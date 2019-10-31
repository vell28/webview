import { createAction } from 'redux-actions';

import { Action } from '@/models';

export const GET_CARD_LIST: string = 'card/GET_CARD_LIST';
export const SET_CARD_LIST: string = 'card/SET_CARD_LIST';

export const getCardListAction = createAction<Action<any>>(GET_CARD_LIST);
export const setCardListAction = createAction<Action<any>>(SET_CARD_LIST);
