import { createAction } from 'redux-actions';

import { Action } from '@/models';

export const TOGGLE_SIDEBAR: string = 'ui/TOGGLE_SIDEBAR';

export const toggleSidebarAction = createAction<Action<boolean>>(TOGGLE_SIDEBAR);
