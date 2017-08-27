'use strict'

const {polygon} = require('@turf/helpers')
const computeTiles = require('tile-cover').tiles

const computeTileIndex = (layer, zoom) => {
	const bbox = polygon([[
		[layer.bbox.minY, layer.bbox.minX],
		[layer.bbox.minY, layer.bbox.maxX],
		[layer.bbox.maxY, layer.bbox.maxX],
		[layer.bbox.maxY, layer.bbox.minX],
		[layer.bbox.minY, layer.bbox.minX]
	]])

	return computeTiles(bbox.geometry, {min_zoom: zoom, max_zoom: zoom})
}

module.exports = computeTileIndex
