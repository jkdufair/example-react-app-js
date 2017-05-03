import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { createStore,	applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducer from './reducers'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
	reducer, composeWithDevTools(
		applyMiddleware(sagaMiddleware)
	))

sagaMiddleware.run(rootSaga)

export function action(type, payload) {
	store.dispatch(Object.assign({}, { type	}, payload))
}

ReactDOM.render(
	<Provider store={ store }	key="provider">
		<App />
	</Provider>,
	document.getElementById('root')
);
