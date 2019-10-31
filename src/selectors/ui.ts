import * as R from 'ramda';

export const getSidebar = state => R.path(['ui', 'sidebar'], state);
export const getPreloader = state => R.path(['ui', 'preloader'], state);
export const getProgressBar = state => R.path(['ui', 'progressBar'], state);
export const getNotify = state => R.path(['ui', 'notifications'], state);
export const getLoader = state => R.path(['ui', 'loaders'], state);
