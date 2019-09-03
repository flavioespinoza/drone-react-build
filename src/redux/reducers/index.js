import { combineReducers } from 'redux'

import dashboardReducer from './dashboardReducer'
import claimsReducer from './claimsReducer'

export default combineReducers({
	dashboardReducer,
	claimsReducer
})