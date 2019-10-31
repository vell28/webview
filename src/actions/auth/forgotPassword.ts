import { createAction } from 'redux-actions';

import { Action, GetForgotPassword } from '@/models';

export const FORGOT_PASSWORD: string = 'auth/FORGOT_PASSWORD';

export const getForgotPassAction = createAction<Action<GetForgotPassword>>(FORGOT_PASSWORD);
