import { createAction } from 'redux-actions';

import { Action } from '@/models';

export const GET_LOADER: string = 'ui/GET_LOADER';
export const TOGGLE_LOADER: string = 'ui/TOGGLE_LOADER';

export const getLoaderAction = createAction<Action<string>>(GET_LOADER);
export const toggleLoaderAction = createAction<Action<string[]>>(TOGGLE_LOADER);
