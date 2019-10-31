import { createAction } from 'redux-actions';

import { Action } from '@/models';

export const UPDATE_USER: string = 'user/UPDATE_USER';

export const updateUserAction = createAction<Action<any>>(UPDATE_USER);
