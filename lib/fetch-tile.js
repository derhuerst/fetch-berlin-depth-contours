'use strict'

const {tileToBBOX} = require('@mapbox/tilebelt')
const mercator = require('projections/mercator')

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

const getTile = (layer, tile, width = 500) => {
	const [minLon, minLat, maxLon, maxLat] = tileToBBOX(tile)
	const bbox = {minLon, minLat, maxLon, maxLat}

	return request({
		request: 'GetMap',
		layers: layer.key,
		crs: layer.crs,
		bbox: formatBbox(bbox),
		width: width + '',
		height: Math.round(width / tileRatio(bbox)) + '',
		styles: '',
		transparent: 'true',
		format: layer.format
	})
}

module.exports = getTile
