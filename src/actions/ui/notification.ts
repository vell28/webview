import { createAction } from 'redux-actions';

import { Action } from '@/models';

export const CREATE_NOTIFICATION = 'ui/CREATE_NOTIFICATION';
export const SET_NOTIFICATION = 'ui/SET_NOTIFICATION';

export const createNotifyAction = createAction<Action<string>>(CREATE_NOTIFICATION);
export const setNotifyAction = createAction<Action<string>>(SET_NOTIFICATION);
