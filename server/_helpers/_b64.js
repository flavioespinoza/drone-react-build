const base64Img = require('base64-img')

async function img_to_b64(img) {
	return new Promise(async (resolve, reject) => {
		try {
			base64Img.base64(img, function (err, img_b64_data) {
				if (err) {
					reject(err)
				} else {
					resolve(img_b64_data)
				}
			})
		} catch (_err) {
			reject(_err)
		}
	})
}

async function b64_to_img(img_b64_data, dest_dir, file_name) {
	return new Promise(async (resolve, reject) => {
		try {
			base64Img.img(img_b64_data, dest_dir, file_name, function (err, img) {
				if (err) {
					reject(err)
				} else {
					resolve(img)
				}
			})
		} catch (_err) {
			reject(_err)
		}
	})
}

module.exports = {
	img_to_b64,
	b64_to_img
}