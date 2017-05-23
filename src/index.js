import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import {
	setStore as actionServiceSetStore,
	dispatchAction
} from './services/actionService'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import { actions as authActions } from 'studiokit-auth-js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

import reducer from './redux/reducers'
import rootSaga from './redux/sagas/rootSaga'

injectTapEventPlugin()

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
	reducer,
	composeWithDevTools(applyMiddleware(sagaMiddleware))
)
sagaMiddleware.run(rootSaga)

actionServiceSetStore(store)

const match = window.location.href.match(/ticket=(.*)&?/)
if (match && match.length > 1) {
	const ticket = match[1]
	dispatchAction(authActions.CAS_LOGIN_REQUESTED, { payload: ticket })
	// TODO: remove ticket query param
	// TODO: deploy to somewhere we can test this!
}

ReactDOM.render(
	<Provider store={store} key="provider">
		<MuiThemeProvider>
			<App />
		</MuiThemeProvider>
	</Provider>,
	document.getElementById('root')
)
