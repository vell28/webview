import * as R from 'ramda';

export const getTemplate = state => R.path(['businessCard', 'formTemplate'], state);
export const getUserCardList = state => R.path(['businessCard', 'list'], state);
