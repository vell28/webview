import { createAction } from 'redux-actions';

import { Action } from '@/models';

export const SET_UNITY_INFO: string = 'version/SET_UNITY_INFO';

export const setUnityAction = createAction<Action<null>>(SET_UNITY_INFO);
