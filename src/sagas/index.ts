import { fork, all } from 'redux-saga/effects';

import auth from './auth';
import products from './products';
import createCard from './businessCard';
import user from './user';
import ui from './ui';

export default function* () {
  yield all([
    fork(auth),
    fork(products),
    fork(createCard),  
    fork(user),
    fork(ui)
  ]);
}
