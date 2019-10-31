import { createAction } from 'redux-actions';

import { Action } from '@/models';

export const LOCALE_CHANGE = 'LOCALE_CHANGE';
export const SET_LOCALE = 'SET_LOCALE';

export const getLocaleAction = createAction<Action<null>>(SET_LOCALE);
export const setLocaleAction = createAction<Action<string>>(LOCALE_CHANGE);
