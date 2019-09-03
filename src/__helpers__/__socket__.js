import io from 'socket.io-client'

const endpoint = {
	production: {
		transports: ['websocket'],
		secure: true,
	},
	development: 'http://localhost:5000/'
}

let _socket
let ssl = (window.location.protocol === 'https:')

if (ssl) {
	_socket = io.connect('/', endpoint.production)
} else {
	_socket = io.connect(endpoint.development)
}

export const socket = _socket