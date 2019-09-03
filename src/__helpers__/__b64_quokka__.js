// Test file for use with Quokka Pro

// Quokka Docs: https://quokkajs.com/docs/index.html 

// Plugins:
// VSCode: https://marketplace.visualstudio.com/items?itemName=WallabyJs.quokka-vscode
// Atom: https://atom.io/packages/atom-quokka
// JetBrains: https://plugins.jetbrains.com/plugin/9667-quokka


const img_to_b64 = require('./__b64__.js').img_to_b64
const b64_to_img = require('./__b64__.js').b64_to_img

let count = 0

img_to_b64('src/assets/img/faces/lucy.jpg')
	.then((img_b64_data) => {
		console.log('encode_img success')
		if (count === 0) {
			b64_to_img(img_b64_data, 'src/assets/img/faces/', 'lucy_decoded')
			count++
		}
	})
	.catch((err) => {
		const error = new Error(err)
		console.error(error.message)
	})
