import { createAction } from 'redux-actions';

import { Action, CategoriesModel } from '@/models';

export const GET_PRODUCTS: string = 'GET_PRODUCTS';
export const SET_PRODUCTS: string = 'SET_PRODUCTS';

export const getProductsAction = createAction<Action<null>>(GET_PRODUCTS);
export const setProductsAction = createAction<Action<CategoriesModel>>(SET_PRODUCTS);
