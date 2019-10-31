import * as R from 'ramda';

export const getLocations = state => R.path([ 'routing', 'location'], state);
