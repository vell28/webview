import { handleActions } from 'redux-actions';
import { SET_UNITY_INFO } from '@/actions/support';

const buildInfo = require('../../../dist/buildInfo.json');

const defaultState: any = {
  build: {
    version: '1.6.1',
    revision: 'db9e9f619b4d',
    creationDate: '11.02.2019 11:14',
    pipeline: 'cd'
  },
  ui: {
    version:      buildInfo.version || '1.0.1',
    revision:     buildInfo.revision || 'db9e9f619b4d',
    creationDate: buildInfo.creationDate || '11.02.2019 11:14',
    pipeline:     buildInfo.pipeline || 'cd'
  }
};

export default handleActions({
  [SET_UNITY_INFO]: (state, action) => ({
    ...state,
    build: { ...action.payload }
  })
},                           defaultState);
