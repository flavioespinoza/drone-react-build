require('dotenv').config()

const request = require("request")
const log = require('ololog')

const get_userinfo_uri = (domain_env) => {
	if (domain_env === 'pd') {
		return process.env.URI_USERINFO_PD
	} else {
		return process.env.URI_USERINFO
	}
}

const openid_user_info_req = async (access_token) => {
	const domain_env = process.env.DOMAIN_ENV
	const userinfo_uri = get_userinfo_uri(domain_env)
	const options = {
		rejectUnauthorized: false, // TODO: have CA signed certs for authnet nodes and remove this
		method: 'GET',
		url: userinfo_uri,
		headers: {
			'Connection': 'keep-alive',
			'Cache-Control': 'no-cache',
			'Host': 'ra-authnet.resilient-networks.com',
			'Authorization': `Bearer ${access_token}`
		},
		// TODO: Resolve this issue
		// Below is a temporary hack to bypass a bug in the privacy agent, wherein a empty body will cause a panic
		// https://github.com/webshield-dev/privacy-agent/issues/33
		form: { 
			'temporary': 'value'
		}
	}
	return new Promise(async (resolve) => {
		request(options, function (error, response, body) {
			if (error) throw new Error(error)
			let _body = JSON.parse(body)
			resolve({
				status_code: response.statusCode,
				response_headers: response.headers,
				body: _body
			})
		})
	})
}

module.exports = {
	openid_user_info_req
}
