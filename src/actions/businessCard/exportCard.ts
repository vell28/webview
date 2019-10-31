import { createAction } from 'redux-actions';

import { Action } from '@/models';

export const EXPORT_BUSINESS_CARD: string = 'card/EXPORT_BUSINESS_CARD';

export const exportCardAction = createAction<Action<any>>(EXPORT_BUSINESS_CARD);
