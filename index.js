'use strict'

const assertCapabilities = require('./lib/assert-capabilities')
const getTile = require('./lib/get-tile')

const example = [13.393,52.523,13.395,52.524]

assertCapabilities()
.then((layer) => {
	// console.log(layer)
	return getTile(layer, example)
})
.catch((err) => {
	console.error(err)
	process.exit(1)
})
