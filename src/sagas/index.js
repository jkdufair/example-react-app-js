import { all } from 'redux-saga/effects'
import { sagas as authSagas } from 'studiokit-auth-js'
import { sagas as netSagas } from 'studiokit-net-js'

export default function* rootSaga() {
	yield all({
		loginFlow: authSagas.loginFlow(),
		fetchSaga: netSagas.fetchSaga()
	})
}