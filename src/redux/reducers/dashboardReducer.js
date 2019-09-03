const log = require('ololog')

export default function dashboardReducer (state = {
	user_info: {},
	global_id_graph: {},
	authenticated: false,
	route: null,
	my_contacts: [],
	proofing_annotation: null
}, action) {
	switch (action.type) {
		case 'SET_USER_INFO': {
			// log.yellow('rootReducer --> SET_USER_INFO', JSON.stringify(action.payload, null, 2))
			return {
				...state,
				user_info: action.payload
			}
		}
		case 'SET_GLOBAL_ID_GRAPH': {
			// log.cyan('rootReducer --> SET_GLOBAL_ID_GRAPH', JSON.stringify(action.payload, null, 2))
			return {
				...state,
				global_id_graph: action.payload
			}
		}
		case 'SET_AUTHENTICATED': {
			// log.blue('rootReducer --> SET_GLOBAL_ID_GRAPH', action.payload)

			return {
				...state,
				authenticated: action.payload
			}
		}
		case 'SET_ROUTE': {
			// log.magenta('rootReducer --> SET_ROUTE', action.payload)
			return {
				...state,
				route: action.payload
			}
		}
		case 'SET_MY_CONTACTS': {
			// log.magenta('rootReducer --> SET_MY_CONTACTS', action.payload)
			return {
				...state,
				my_contacts: action.payload
			}
		}
		case 'SET_PROOFING_ANNOTATION': {
			// log.magenta('rootReducer --> SET_PROOFING_ANNOTATION', action.payload)
			return {
				...state,
				proofing_annotation: action.payload
			}
		}
	}
	return state
}