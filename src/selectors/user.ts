import * as R from 'ramda';

export const getUser = state => R.prop('user', state);
export const getUserLogged = state => R.path([ 'user', 'isLogged' ], state);
export const getUserToken = state => R.path([ 'user', 'token' ], state);
export const getUserEmail = state => R.path([ 'user', 'email' ], state);
export const getUserImage = state => R.path([ 'user', 'image' ], state);
