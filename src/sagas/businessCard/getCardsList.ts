import { call, put, select, take } from 'redux-saga/effects';
import HTTP from '@/httpService';
import { AnyAction } from 'redux';

import API from '@/routing/api';
import { setCardListAction, SET_FORM_TEMPLATE } from '@/actions';
import { addImageLink } from '@/utils';
import { getUserToken } from '@/selectors/user';  

export function* getCardsList({}: AnyAction) {

    try {
        const token = yield select(getUserToken);
        const { payload } = yield take(SET_FORM_TEMPLATE);
            
        const { data } = yield(call(HTTP, 'POST', API.businessCard.getList, {}, true)); 

        Object.keys(payload).forEach(item => 
            
            payload[item].forEach(count => {

                data.forEach(list => {

                    if (count.id === list.idSchema) {
                        
                        list['template'] = item;

                        Object.keys(count.schema).forEach(temp => {
                            if(list.schema[temp]) {

                                list.schema[temp].placeHolder = count.schema[temp].placeHolder;
                            }
                        })
                    }
                })
            })
        )    

        yield put(setCardListAction(
            addImageLink(data, token)
        ));

    } catch (err) {
        console.log(err)
    }
}
