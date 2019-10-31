import * as R from 'ramda';

export const getLocale = state => R.prop('locale', state);
