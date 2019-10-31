import { createAction } from 'redux-actions';

import { Action } from '@/models';

export const SET_PROGRESS: string = 'ui/SET_PROGRESS';
export const START_PROGRESS: string = 'ui/START_PROGRESS';

export const startProgressAction = createAction<Action<null>>(START_PROGRESS);
export const receivedProgressAction = createAction<Action<number>>(SET_PROGRESS);
