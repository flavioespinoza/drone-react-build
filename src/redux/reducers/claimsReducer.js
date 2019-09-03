const log = require('ololog')

export default function claimsReducer (state = {
	claim_about: undefined,
	claim_answers: []
}, action) {
	switch (action.type) {
		case 'SET_CLAIM_ABOUT': {
			// log.yellow('claimsReducer --> SET_CLAIM_ABOUT', JSON.stringify(action.payload, null, 2))
			return {
				...state,
				claim_about: action.payload
			}
		}
		case 'SET_CLAIM_ANSWERS': {
			// log.cyan('claimsReducer --> SET_CLAIM_ANSWERS', JSON.stringify(action.payload, null, 2))
			return {
				...state,
				claim_answers: action.payload
			}
		}
	}
	return state
}