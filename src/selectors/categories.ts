import * as R from 'ramda';

export const getCategories = state => R.path(['categories', 'categories'], state);
export const getPopularProducts = state => R.path(['categories', 'popular'], state);
