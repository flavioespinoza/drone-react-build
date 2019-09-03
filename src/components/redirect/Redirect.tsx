import * as React from 'react'

const log = require('ololog')

interface Props { }

interface State { }

class Redirect extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)
	}

	componentDidMount() {

		console.log(window.location)
		const url = new URL(window.location.href)
		const code = url.searchParams.get('code')
		const email = url.searchParams.get('email')
		const apikey = url.searchParams.get('apikey')
		const domain = url.searchParams.get('domain')

		log.lightMagenta(url)
		log.cyan(email)
		log.yellow(apikey)
		log.green(domain)

		fetch('/api/openIdClient/redirect', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				url,
				code,
				email,
				apikey,
				domain
			})
		})
	}

	private _getToken = () => {

	}

	render() {



		return (
			<section>Hello Redirect</section>
		)
	}


}


export default Redirect