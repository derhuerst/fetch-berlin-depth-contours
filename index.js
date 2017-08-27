'use strict'

const createQueue = require('queue')

const assertCapabilities = require('./lib/assert-capabilities')
const computeTileIndex = require('./lib/compute-tile-index')
const fetchTile = require('./lib/fetch-tile')

const downloadTile = (layer, tile, layers, size, save) => {
	const job = (cb) => {
		fetchTile(layer, tile, layers, size)
		.then(res => save(tile, res))
		.then(cb, cb)
	}

	job.title = tile.join('-')
	return job
}

const defaults = {
	zoom: 18,
	size: 500,
	concurrency: 4,
	bbox: null, // default: bbox that the WMS server provides
	layers: null // default: layer identified by lib/assert-capabilities
}

const download = (saveTile, onSuccess, onFailure, opt = {}) => {
	opt = Object.assign({}, defaults, opt)
	const {zoom, size, concurrency} = opt
	const layers = opt.layers || [layer.key]
	const bbox = opt.bbox || {
		minLat: layer.bbox.minY,
		minLon: layer.bbox.minX,
		maxLat: layer.bbox.maxY,
		maxLon: layer.bbox.maxX
	}

	return assertCapabilities()
	.then((layer) => new Promise((yay) => {
		const queue = createQueue({concurrency, autostart: true})

		queue.once('end', () => yay())
		queue.on('success', onSuccess)
		queue.on('error', onFailure)

		const tiles = computeTileIndex(bbox, zoom)
		for (let tile of tiles) {
			queue.push(downloadTile(layer, tile, layers, size, saveTile))
		}
	}))
}

module.exports = download
