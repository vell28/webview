import { handleActions } from 'redux-actions';

import { SET_PRODUCTS } from '@/actions/categories'
import { CategoriesModel } from '@/models';

const defaultState: CategoriesModel | any = {
  categories: [],
  popular: []
};

export default handleActions({
    [ SET_PRODUCTS ]: (state, action) => ({
      ...state,
      ...action.payload
    })
},                           defaultState);
