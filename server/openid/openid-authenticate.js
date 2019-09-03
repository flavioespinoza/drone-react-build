require('dotenv').config()

const log = require('ololog').configure({ locate: false })

const get_auth_uri = (domain_env) => {
	if (domain_env === 'pd') {
		return process.env.URI_AUTH_PD
	} else {
		return process.env.URI_AUTH
	}
}

const openid_authenticate_req = async (params) => {
	const domain_env = process.env.DOMAIN_ENV
	const auth_uri = get_auth_uri(domain_env)
	return new Promise(async (resolve) => {
		let params_str = Object.entries(params).map(arr => `${arr[0]}=${arr[1]}`).join('&')
		let login_url = `${auth_uri}?${params_str}`
		log.lightMagenta(login_url)
		resolve(login_url)
	})
}

module.exports = {
	openid_authenticate_req
}
