import * as R from 'ramda';

export const getVersion = state => R.prop('version', state);
