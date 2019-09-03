const log = require('ololog')

export function setUserInfo(obj) {
	// log.yellow('rootActions --> setUserInfo(obj)', JSON.stringify(obj, null, 2))
	return {
		type: 'SET_USER_INFO',
		payload: obj
	}
}

export function setGlobalIdGraph(obj) {
	// log.yellow('rootActions --> setGlobalIdGraph(obj)', JSON.stringify(obj, null, 2))
	return {
		type: 'SET_GLOBAL_ID_GRAPH',
		payload: obj
	}
}

export function setAuthenticated (bool) {
	// log.magenta('rootActions --> SET_AUTHENTICATED', bool)
	return {
		type: 'SET_AUTHENTICATED',
		payload: bool
	}
}

export function setRoute (url) {
	// log.magenta('rootActions --> SET_ROUTE', url)
	return {
		type: 'SET_ROUTE',
		payload: url
	}
}

export function setMyContacts (arr) {
	// log.blue('rootActions --> SET_MY_CONTACTS', arr)
	return {
		type: 'SET_MY_CONTACTS',
		payload: arr
	}
}

export function setProofingAnnotation (str) {
	log.blue('rootActions --> SET_PROOFING_ANNOTATION', str)
	return {
		type: 'SET_PROOFING_ANNOTATION',
		payload: str
	}
}