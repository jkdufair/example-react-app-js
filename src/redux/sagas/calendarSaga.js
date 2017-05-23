import { actions as netActions } from 'studiokit-net-js'
import { put, take } from 'redux-saga/effects'
import { createAction } from '../../services/actionService'

export default function* calendarSaga() {
	yield take(
		action =>
			action.type === netActions.FETCH_RESULT_RECEIVED &&
			action.modelName === 'user.calendarToken'
	)
	yield put(
		createAction(netActions.DATA_REQUESTED, { modelName: 'user.events' })
	)
}
