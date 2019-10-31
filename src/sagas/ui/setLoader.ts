import { put, select } from 'redux-saga/effects';
import { AnyAction } from 'redux';

import { getLoader } from '@/selectors/ui'
import { toggleLoaderAction } from '@/actions';

export function* setLoader({ payload }: AnyAction) { 
    
    let loaders = yield select(getLoader);

    const loader = loaders.find(item => item === payload);

    if(loader) {
        loaders = loaders.filter(item => item !== payload);
    } else {
        loaders = loaders.slice();
        loaders.push(payload);
    }

    yield put(toggleLoaderAction(loaders));

}
