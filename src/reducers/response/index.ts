import { handleActions } from 'redux-actions';

import { SET_RESPONSE } from '@/actions';
import { Response } from '@/models';

const defaultState: any | Response = {
    component: '',
    status: 0,
    name: '',
    text: ''
};

export default handleActions({
    [ SET_RESPONSE ]: (state, action) => ({
        ...action.payload
    })
},                           defaultState);
