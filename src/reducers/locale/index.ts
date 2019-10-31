import { handleActions } from 'redux-actions';

import { LOCALE_CHANGE } from '@/actions';
import { EN }            from '@/constants/locales';

const lang = window.location.search.replace('?lang=', '');
const defaultState: string = lang || EN;

export default handleActions({
  [LOCALE_CHANGE]: (state, action) => (
    action.payload
  )
},                           defaultState);
