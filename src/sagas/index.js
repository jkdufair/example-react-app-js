import { all } from 'redux-saga/effects'
import { sagas as authSagas, apis as authApis } from 'studiokit-auth-js'
import { sagas as netSagas } from 'studiokit-net-js'
import apis from '../apis'

export default function* rootSaga() { 
	yield all({
			loginFlow: authSagas.auth({ client_id: 'web', client_secret: '7210f703-f941-4601-b293-f0c2f8102fbc'}),
			fetchSaga: netSagas.fetch(Object.assign({}, apis, authApis), 'https://dev.academicforecast.org')
	})
}