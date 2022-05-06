import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore,applyMiddleware} from 'redux';
import allreducer from './redux/reducer/index';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = {
  key:"root",
  storage
};

const PersistReduc = persistReducer(persistConfig,allreducer);

const webstore = createStore(PersistReduc,applyMiddleware(thunk));

const PersistSto = persistStore(webstore);


ReactDOM.render(
  <React.StrictMode>
    <Provider store={webstore}>
      <PersistGate loading={null} persistor = {PersistSto}>
        <App />
      </PersistGate> 
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
