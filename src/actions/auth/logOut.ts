import { createAction } from 'redux-actions';

import { Action } from '@/models';

export const LOG_OUT: string = 'auth/LOG_OUT';

export const logOutAction = createAction<Action<null>>(LOG_OUT);
