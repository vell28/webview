import { createAction } from 'redux-actions';

import { Action, Response } from '@/models';

export const SET_RESPONSE: string = 'error/SET_RESPONSE';

export const setResponseAction = createAction<Action<Response>>(SET_RESPONSE);