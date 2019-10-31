import { createAction } from 'redux-actions';

import { Action } from '@/models';

export const UPDATE_BUSINESS_CARD: string = 'card/UPDATE_BUSINESS_CARD';

export const updateCardAction = createAction<Action<any>>(UPDATE_BUSINESS_CARD);
