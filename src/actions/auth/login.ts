import { createAction } from 'redux-actions';

import { Action, GetLogin, SetLogin } from '@/models';

export const LOG_IN: string = 'auth/LOG_IN';

export const SET_TOKEN: string = 'auth/SET_TOKEN';

export const getLoginAction: Action<GetLogin> = createAction(LOG_IN);

export const setLoginAction: Action<SetLogin> = createAction(SET_TOKEN);
