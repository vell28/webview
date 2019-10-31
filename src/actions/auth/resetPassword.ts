import { createAction } from 'redux-actions';

import { Action, GetResetPassword } from '@/models';

export const RESET_PASSWORD: string = 'auth/RESET_PASSWORD';

export const getResetPassAction: Action<GetResetPassword> = createAction(RESET_PASSWORD);
