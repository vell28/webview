import { handleActions } from 'redux-actions';

import * as actions from '@/actions';

const defaultState = {
  sidebar: false,
  preloader: false,
  loaders: [],
  progressBar: -1,
  notifications: []
}

export default handleActions({
  [actions.TOGGLE_SIDEBAR]: (state, action) => ({
    ...state,
    sidebar: action.payload
  }),
  [actions.TOGGLE_PRELOADER]: (state, action) => ({
    ...state,
    preloader: action.payload
  }),
  [actions.SET_PROGRESS]: (state, action) => ({
    ...state,
    progressBar: action.payload
  }),
  [actions.SET_NOTIFICATION]: (state, action) => ({
    ...state,
    notifications: action.payload
  }),
  [actions.TOGGLE_LOADER]: (state, action) => ({
    ...state,
    loaders: action.payload
  })
},                           defaultState);
