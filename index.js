'use strict'

const assertCapabilities = require('./lib/assert-capabilities')
const fetchTile = require('./lib/fetch-tile')

const example = [140883, 85996, 18]

assertCapabilities()
.then(layer => fetchTile(layer, example, 1200))
.then(res => res.buffer())
.then(tile => process.stdout.write(tile))
.catch((err) => {
	console.error(err)
	process.exit(1)
})
