require('dotenv').config()

const sgMail = require('@sendgrid/mail')
const _error = require('./_utils')._error
const sengrid_key = process.env.SENGRID_KEY
const log = require('ololog').configure({locate: false})

module.exports = async (email, body) => {
	try {
		sgMail.setApiKey(sengrid_key)

		const msg = {
			to: email,
			from: body.from,
			subject: body.subject,
			text: body.text,
			html: '<div>' +
			'<h3>' + body.title +'</h3>' +
			'<p>' + body.text + '</p>' +
			'</div>'
		}

		sgMail.send(msg)

		return `Message sent to ${email}.`

	} catch (err) {
	  _error('_send_email', err)
	}
}