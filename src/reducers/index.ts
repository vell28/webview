import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import locale from './locale';
import response from './response';
import user from './user';
import categories from './categories';
import ui from './ui';
import businessCard from './businessCard';
import version from './version';

export default combineReducers({
  businessCard,
  locale,
  routing: routerReducer,
  response,
  categories,
  user,
  ui,
  version
});
