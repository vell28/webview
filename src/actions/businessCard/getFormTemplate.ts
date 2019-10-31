import { createAction } from 'redux-actions';

import { Action } from '@/models';

export const GET_FORM_TEMPLATE: string = 'card/GET_FORM_TEMPLATE';
export const SET_FORM_TEMPLATE: string = 'card/SET_FORM_TEMPLATE';

export const getTemplateAction = createAction<Action<any>>(GET_FORM_TEMPLATE);
export const setTemplateAction = createAction<Action<any>>(SET_FORM_TEMPLATE);
