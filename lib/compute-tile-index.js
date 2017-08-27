'use strict'

const {polygon} = require('@turf/helpers')
const computeTiles = require('tile-cover').tiles

const computeTileIndex = (layer, zoom) => {
	const bbox = polygon([[
		// [layer.bbox.minY, layer.bbox.minX],
		// [layer.bbox.minY, layer.bbox.maxX],
		// [layer.bbox.maxY, layer.bbox.maxX],
		// [layer.bbox.maxY, layer.bbox.minX],
		// [layer.bbox.minY, layer.bbox.minX]
		[13.444004, 52.502325],
		[13.499107, 52.501959],
		[13.499536, 52.473004],
		[13.444604, 52.473788],
		[13.444004, 52.502325]
	]])

	return computeTiles(bbox.geometry, {min_zoom: zoom, max_zoom: zoom})
}

module.exports = computeTileIndex
