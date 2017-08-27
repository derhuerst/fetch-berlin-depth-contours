'use strict'

const {polygon} = require('@turf/helpers')
const computeTiles = require('@mapbox/tile-cover').tiles

const computeTileIndex = (bbox, zoom) => {
	const pol = polygon([[
		[bbox.minLon, bbox.minLat],
		[bbox.minLon, bbox.maxLat],
		[bbox.maxLon, bbox.maxLat],
		[bbox.maxLon, bbox.minLat],
		[bbox.minLon, bbox.minLat]
	]])

	return computeTiles(pol.geometry, {min_zoom: zoom, max_zoom: zoom})
}

module.exports = computeTileIndex
