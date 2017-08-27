'use strict'

const createQueue = require('queue')

const assertCapabilities = require('./lib/assert-capabilities')
const computeTileIndex = require('./lib/compute-tile-index')
const fetchTile = require('./lib/fetch-tile')

const downloadTile = (layer, tile, size, save) => {
	const job = (cb) => {
		fetchTile(layer, tile, size)
		.then(res => save(tile, res))
		.then(cb, cb)
	}

	job.title = tile.join('-')
	return job
}

const defaults = {
	zoom: 18,
	size: 500,
	concurrency: 4
}

const download = (saveTile, onSuccess, onFailure, opt = {}) => {
	const {zoom, size, concurrency} = Object.assign({}, defaults, opt)

	return assertCapabilities()
	.then((layer) => new Promise((yay) => {
		const queue = createQueue({concurrency, autostart: true})

		queue.once('end', () => yay())
		queue.on('success', onSuccess)
		queue.on('error', onFailure)

		const tiles = computeTileIndex(layer, zoom)
		for (let tile of tiles) {
			queue.push(downloadTile(layer, tile, size, saveTile))
		}
	}))
}

module.exports = download
