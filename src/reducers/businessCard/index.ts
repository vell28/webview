import { handleActions } from 'redux-actions';

import * as types from '@/actions';
import { LOG_OUT } from '@/actions/auth';

const defaultState: any = {
    list: [],
    formTemplate: {}
}

export default handleActions({
  [ types.SET_CARD_LIST ]: (state, action) => ({
    ...state,
    list: action.payload
  }),
  [ types.SET_FORM_TEMPLATE ]: (state, action) => ({
    ...state,
    formTemplate: action.payload
  }),
  [ LOG_OUT ]: () => defaultState
},                           defaultState);
