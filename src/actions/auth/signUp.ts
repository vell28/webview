import { createAction } from 'redux-actions';

import { Action, GetSignUp, SetSignUp } from '@/models';

export const SIGN_UP: string = 'auth/SIGN_UP';

export const SET_SIGN_UP: string = 'auth/SET_SIGN_UP';

export const getSignUpAction: Action<GetSignUp> = createAction(SIGN_UP);

export const setSignUpAction: Action<SetSignUp> = createAction(SET_SIGN_UP);
