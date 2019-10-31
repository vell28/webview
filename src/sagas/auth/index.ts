import { takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import * as types from '@/actions/auth';
import { login } from './login';
import { signUp } from './signUp';
import { forgotPass } from './forgotPassword';
import { restorePass } from './restorePass';

export default function* (): SagaIterator {
    yield takeEvery(types.LOG_IN, login);
    yield takeEvery(types.SIGN_UP, signUp);
    yield takeEvery(types.FORGOT_PASSWORD, forgotPass);
    yield takeEvery(types.RESET_PASSWORD, restorePass);
}
