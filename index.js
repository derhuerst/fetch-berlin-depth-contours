'use strict'

const assertCapabilities = require('./lib/assert-capabilities')
const computeTileIndex = require('./lib/compute-tile-index')
const fetchTile = require('./lib/fetch-tile')

const zoom = 18
const example = [140883, 85996, 18]

assertCapabilities()
.then((layer) => {
	const index = computeTileIndex(layer, zoom)

	return fetchTile(layer, example, 500)
})
.then(res => res.buffer())
.then(tile => process.stdout.write(tile))
.catch((err) => {
	console.error(err)
	process.exit(1)
})
