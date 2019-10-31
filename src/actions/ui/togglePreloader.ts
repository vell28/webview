import { createAction } from 'redux-actions';

import { Action } from '@/models';

export const TOGGLE_PRELOADER: string = 'ui/TOGGLE_PRELOADER';

export const togglePreloaderAction = createAction<Action<boolean>>(TOGGLE_PRELOADER);
