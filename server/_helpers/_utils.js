// Required Modules
require('ansicolor').nice

const log = require('ololog').configure({ locate: false })

const util = require('util')

const _ = require('lodash')

const jsonexport = require('jsonexport')

const fs = require('fs')

// Utility Constants
const _log = {
	log: log,
	deep: (data) => {
		console.log(util.inspect(data, false, null, true /* enable colors */))
	},
	error: (msg) => {
		console.log(` error: ${msg} `.bgRed.white)
	},
	debug: (msg) => {
		// console.log(` debug: ${msg} `.bgRed.black)
	},
	alert: (msg) => {
		console.log(` alert: ${msg} `.bgYellow.white)
	},
	warn: (msg) => {
		console.log(` warn: ${msg} `.bgMagenta.white)
	},
	info: (msg) => {
		console.log(` info: ${msg} `.bgBlue.white)
	},
	cyan: (msg) => {
		console.log(`${msg} `.bgCyan.white)
	},
	blue: (msg) => {
		console.log(`${msg} `.bgBlue.white)
	},
	red: (msg) => {
		console.log(`${msg} `.bgRed.white)
	},
	yellow: (msg) => {
		console.log(`${msg} `.bgYellow.white)
	},
	assert: (item, item_name) => {
		if (item) {
			let msg = ` SUCCESS: ${item_name} = ${item} `
			console.log(`ASSERT`, msg.bgCyan.black)
		}
		else {
			let msg = ` FAIL: ${item_name} = ${item} `
			console.log(`ASSERT`, msg.bgRed.black)
		}
	},
	timer: (method, method_name) => {
		console.time(`_timer ${method_name}()`)
		method()
		console.timeEnd(`_timer ${method_name}()`)
	}
}

const _sleep = require('util').promisify(setTimeout)

function _success(method, data) {
	const obj = {
		success: true,
		type: 'data',
		method: method,
		msg: method + ' response data',
		data: data
	}
	log.lightBlue(obj)
	return obj
}

function _error(method, err) {
	const error = new Error(err)
	const obj = {
		success: false,
		type: 'error',
		method: method,
		msg: error.message,
		info: error
	}
	log.lightYellow(error)
	return obj
}

function _error_socket(method, err, socket) {
	log.lightYellow(`${method}  ERROR`, err.message)
	if (socket) {
		socket.emit(`${method}__ERROR`, err.message)
	}
}

function _log_error(err_info) {

	let timestamp = new Date().getTime()
	let date = new Date()

	function createError(name, init) {
		function Err(message) {
			Error.captureStackTrace(this, this.constructor)
			this.message = message
			init && init.apply(this, arguments)
		}

		Err.prototype = new Error()
		//set the name property
		Err.prototype.name = name
		// set the constructor
		Err.prototype.constructor = Err

		return Err
	}

	// define new error
	const UnhandledError = createError('Scanner', function (name, invalid) {
		this.message = 'Error: ' + name + 'Reason ' + invalid
	})

	// log & save
	let error = new UnhandledError(date, err_info)
	let stack = error.stack

	log.lightYellow('------------')
	log.lightYellow(date)
	log.lightYellow('------------')
	log.lightYellow(stack)
	log.lightYellow('------------')
	log.cyan({ err_info })
	log.cyan('------------')

	// fs.writeFile(`error__${timestamp}.log`, stack, (err) => {
	// 	// throws an error, you could also catch it here
	// 	if (err) log.red(err)
	//
	// 	// success case, the file was saved
	// 	log.bright.cyan(`error__${timestamp}.log saved`)
	// })

}

// Methods (can be used in any project)
function _alpha_numeric_filter(string) {

	const alpha_numeric = Array.from('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' + ' ')

	const json_string = JSON.stringify(string)

	let filtered_string = ''

	for (let i = 0; i < json_string.length; i++) {

		let char = json_string[i]
		let index = alpha_numeric.indexOf(char)
		if (index > -1) {
			filtered_string += alpha_numeric[index]
		}

	}

	_log.cyan('hello')

	return filtered_string

}

function _write_to_csv(data, file_name) {

	jsonexport(data, function (err, csv) {

		if (err) return console.log(err)

		fs.writeFile(`${file_name}.csv`, csv, (err) => {
			// throws an error, you could also catch it here
			if (err) throw err

			// success case, the file was saved
			log.lightYellow(`${file_name}`)
		})

	})

}

function _set(arr) {

	return [...new Set(arr)]

}

function _split_array(array, chunks) {
	return _.reduce(_.range(chunks), ({ array, result, chunks }, chunkIndex) => {
		const numItems = Math.ceil(array.length / chunks)
		const items = _.take(array, numItems)
		result.push(items)
		return {
			array: _.drop(array, numItems),
			result,
			chunks: chunks - 1
		}
	}, {
			array,
			result: [],
			chunks
		}).result

}

function _toFixed(__number, __digits, __min, __max, __is_balance) {

	let digits

	const sign = Math.sign(__number)

	if (!__number) {
		return 0
	} else if (__is_balance && __number < 0.000001) {
		return 0
	} else {
		if (__min && __max) {
			if (__number > 1) {
				digits = __min
			} else {
				digits = __max
			}
		} else if (__digits) {
			digits = __digits
		} else {
			if (__number > 1) {
				digits = 2
			} else {
				digits = 10
			}
		}

		const reg_ex = new RegExp('(\\d+\\.\\d{' + digits + '})(\\d)')

		const number = __number.toString()

		const array = number.match(reg_ex)

		const result = array ? parseFloat(array[1]) : __number.valueOf()

		if (sign === -1) {
			return -result
		} else {
			return result
		}

	}
}

function _ROI(initial_investment, total_return, show_percent_sign) {

	let percentage = _.round(((total_return - initial_investment) / initial_investment) * 100, 5)
	if (show_percent_sign) {
		return `${percentage} %`
	} else {
		return percentage
	}

}

// Async Methods

async function _are_equal(arr) {

	try {
		let len = arr.length
		for (let i = 1; i < len; i++) {
			if (arr[i] === null || arr[i] !== arr[i - 1])
				return false
		}
		return true
	} catch (err) {
		_error('_are_equal', err)
	}

}

async function _percent_change(last, prev) {

	try {

		if (!last || !prev) return

		let decimal = (last.close - prev.close) / prev.close

		let time_gap_ms = last.timestamp - prev.timestamp
		let time_gap_sec = time_gap_ms / 1000
		let time_gap_min = time_gap_ms / 60000

		let num = decimal * 100
		let sign = Math.sign(num)
		let percent_change = num
		let percent_drop = 0
		let percent_rise = 0

		if (sign === -1) {
			percent_drop = Math.abs(num)
		}
		else {
			percent_rise = Math.abs(num)
		}

		return {
			date_last: last.date,
			date_prev: prev.date,
			decimal,
			num,
			percent_change,
			percent_drop,
			percent_rise,
			time_gap_ms,
			time_gap_sec,
			time_gap_min
		}

	} catch (err) {
		_error('_percent_change', err)
	}

}

async function _time_seq_validation(last, prev) {

	try {

		if (!last || !prev) return

		return (Math.sign(last.timestamp - prev.timestamp) === 1)

	} catch (err) {

		_error('_time_seq_validation', err)

	}

}

async function _uniq_all_props(__arr1, __arr2) {
	let arr = __arr1.concat(__arr2)
	console.log('arr.length', arr.length)
	let set = []
	let result = []
	arr.forEach(function (__obj) {
		/** Set each obj to a string. */
		let string = JSON.stringify(__obj)
		set.push(string)
	})
	set.filter(function (elem, index, self) {
		/** Use filter as a loop to push onto results array.
		 * This is done to preserve prop types from original arrays */
		if (index === self.indexOf(elem)) {
			result.push(arr[index])
		}
	})
	return result
}

// Async Iterative
async function _each(arr, callback) {
	for (let i = 0; i < arr.length; i++) {
		await callback(arr[i], i, arr)
	}
}

// Exports
module.exports = {

	// --- Utility Constants
	_log,

	_sleep,

	// --- Methods

	_success,

	_error,

	_log_error,

	_alpha_numeric_filter,

	_write_to_csv,

	_set,

	_split_array,

	_toFixed,

	// --- Async Methods

	_are_equal,

	_percent_change,

	_time_seq_validation,

	_uniq_all_props,

	// --- Async Iterative
	_each,

}
