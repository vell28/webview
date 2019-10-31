import { createAction } from 'redux-actions';

import { Action } from '@/models';

export const CREATE_BUSINESS_CARD: string = 'card/CREATE_BUSINESS_CARD';

export const createCardAction = createAction<Action<any>>(CREATE_BUSINESS_CARD);
