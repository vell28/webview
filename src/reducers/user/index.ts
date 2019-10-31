import { handleActions } from 'redux-actions';

import { SET_USER } from '@/actions';
import { LOG_OUT } from '@/actions/auth';
import { User } from '@/models';
import { getToken } from '@/utils';

const { isLogged, token } = getToken();

const defaultState: User = {
    isLogged,
    token,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    image: ''
};

export default handleActions({
    [SET_USER]: (state, action) => ({
        ...state,
        ...action.payload
    }),
    [ LOG_OUT ]: () => ({
        ...defaultState,
        isLogged: false,
        phone: '',
        token: '',
        image: ''
    })
},                           defaultState);
