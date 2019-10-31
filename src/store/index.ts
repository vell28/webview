import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware                      from 'redux-saga';
import { composeWithDevTools }                   from 'redux-devtools-extension';
import { routerMiddleware }                      from 'react-router-redux';

import rootSaga                                  from '@/sagas';
import rootReduser                               from '@/reducers';

export const configureStore = () => {

    const sagaMiddleware = createSagaMiddleware();

    const env = process.env.NODE_ENV;
    
    const composeEnhancers: any =  env === 'development' ? composeWithDevTools : compose;

    const mdlwrs = [sagaMiddleware];

    mdlwrs.push(routerMiddleware());

    const store = createStore(
        rootReduser,
        composeEnhancers(
            applyMiddleware(...mdlwrs)
        )
    );

    sagaMiddleware.run(rootSaga);
        
    return { store };
};
