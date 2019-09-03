require('dotenv').config()

const request = require("request")
const log = require('ololog')

const get_token_uri = (domain_env) => {
	if (domain_env === 'pd') {
		return process.env.URI_TOKEN_PD
	} else {
		return process.env.URI_TOKEN
	}
}

const openid_token_req = async (params) => {
	const domain_env = process.env.DOMAIN_ENV
	const token_uri = get_token_uri(domain_env)
	const options = {
		rejectUnauthorized: false, // TODO: have CA signed certs for authnet nodes and remove this
		method: 'POST',
		url: token_uri,
		qs: params,
		headers: {
			'cache-control': 'no-cache',
			'Connection': 'keep-alive',
			'accept-encoding': 'gzip, deflate',
			'Host': 'ra-authnet.resilient-networks.com',
			'Cache-Control': 'no-cache',
			'Accept': '*/*',
			'Content-Type': 'application/x-www-form-urlencoded'
		},

		// Below is a temporary hack to bypass a bug in the privacy agent, wherein a empty body will cause a panic
		// https://github.com/webshield-dev/privacy-agent/issues/33
		form: {
			'temporary': 'value'
		}
	}
	return new Promise(async (resolve) => {
		request(options, function (error, response, body) {
			if (error) throw new Error(error)
			const _body = JSON.parse(body)
			resolve({
				status_code: response.statusCode,
				response_headers: response.headers,
				body: _body
			})
		})
	})
}

module.exports = {
	openid_token_req
}