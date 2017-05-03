import { combineReducers } from 'redux'
import { reducers } from 'studiokit-auth-js'

export default combineReducers({
	auth: reducers.auth
})
