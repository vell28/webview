import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createHashHistory } from 'history';

import LanguageProvider from './locales';
import Router from './routing';
import { configureStore } from './store';
import './assets/styles/styles.less'

export const { store } = configureStore();
export const history = createHashHistory();

const ROOT_NODE = document.getElementById('root');

ReactDOM.render(
  <Provider store={ store }>
    <LanguageProvider>
        <Router history={ history } />
    </LanguageProvider>
  </Provider>,
  ROOT_NODE
);
