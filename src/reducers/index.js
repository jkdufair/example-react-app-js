import { combineReducers } from 'redux'
import { reducers as authReducers } from 'studiokit-auth-js'
import { reducers as netReducers } from 'studiokit-net-js'

export default combineReducers({
	auth: authReducers.auth,
	models: netReducers.fetchReducer
})
