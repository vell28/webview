import { createAction } from 'redux-actions';

import { Action } from '@/models';

export const GET_USER: string = 'user/GET_USER';
export const SET_USER: string = 'user/SET_USER';

export const getUserAction = createAction<Action<null>>(GET_USER);
export const setUserAction = createAction<Action<any>>(SET_USER);
