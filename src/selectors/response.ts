import * as R from 'ramda';

export const getResponse = state => R.prop('response', state);
