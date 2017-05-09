import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { createStore,	applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import { actions as authActions } from 'studiokit-auth-js'


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

const match = window.location.href.match(/ticket=(.*)&?/)
if (match && match.length > 1) {
	const ticket = match[1]
	action(authActions.CAS_LOGIN_REQUESTED, { payload: ticket })
	// TODO: remove ticket query param
	// TODO: deploy to somewhere we can test this!
}


ReactDOM.render(
	<Provider store={ store }	key="provider">
		<App />
	</Provider>,
	document.getElementById('root')
);
