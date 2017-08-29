'use strict'

const {tileToBBOX} = require('@mapbox/tilebelt')
const mercator = require('projections/mercator')

const {convertBboxToSoldner} = require('./convert-bbox')
const request = require('./request')

const formatBbox = (b) => {
	return [
		b.minLat.toFixed(6),
		b.minLon.toFixed(6),
		b.maxLat.toFixed(6),
		b.maxLon.toFixed(6)
	].join(',')
}

const tileRatio = (bbox) => {
	const a = mercator({lat: bbox.minLat, lon: bbox.minLon})
	const b = mercator({lat: bbox.maxLat, lon: bbox.maxLon})
	const w = Math.abs(a.x * 1000 - b.x * 1000)
	const h = Math.abs(a.y * 1000 - b.y * 1000)
	return w / h
}

// Note: Although the FIS Broker (Berlin map server) claims to be able to generate
// EPSG:4326 tiles, it returns tiles that are projected differently and therefore
// don't fit together. Thanks to @jochenklar!
// As a workaround, we convert the tile bounding box into EPSG:3068 (Soldner Berlin),
// which the tile server should support better.
const getTile = (layer, tile, layers, width = 500) => {
	const [minLon, minLat, maxLon, maxLat] = tileToBBOX(tile)
	const bbox = {minLat, minLon, maxLat, maxLon}
	const soldnerBbox = convertBboxToSoldner(bbox)

	console.error({
		layers: layers.join(','),
		crs: layer.crs,
		bbox: formatBbox(soldnerBbox),
		width: width + '',
		height: Math.round(width / tileRatio(bbox)) + ''
	})
	return request({
		request: 'GetMap',
		layers: layers.join(','),
		crs: layer.crs,
		bbox: formatBbox(soldnerBbox),
		width: width + '',
		height: Math.round(width / tileRatio(bbox)) + '',
		styles: '',
		transparent: 'true',
		format: layer.format
	})
}

module.exports = getTile
