import { all } from 'redux-saga/effects'
import { sagas as authSagas, apis as authApis } from 'studiokit-auth-js'
import { sagas as netSagas } from 'studiokit-net-js'
import { fromJS } from 'immutable'
import apis from '../../apis'
import { tokenPersistenceService } from '../../services/tokenPersistenceService'
import calendarSaga from './calendarSaga'

export default function* rootSaga() {
	yield all({
		fetchSaga: netSagas.fetchSaga(
			fromJS(apis).mergeDeep(authApis).toJS(),
			'https://dev.academicforecast.org'
		),
		loginFlow: authSagas.auth(
			{
				client_id: 'web',
				client_secret: '7210f703-f941-4601-b293-f0c2f8102fbc'
			},
			tokenPersistenceService
		),
		calendarSaga: calendarSaga()
	})
}
