import { createAction } from 'redux-actions';

import { Action } from '@/models';

export const REMOVE_BUSINESS_CARD: string = 'card/REMOVE_BUSINESS_CARD';

export const removeCardAction = createAction<Action<any>>(REMOVE_BUSINESS_CARD);
