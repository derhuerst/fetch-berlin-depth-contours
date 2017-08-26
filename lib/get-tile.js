'use strict'

const mercator = require('projections/mercator')

const request = require('./request')

const formatBbox = (b) => [b.minLat, b.minLon, b.maxLat, b.maxLon].join(',')

const tileRatio = (bbox) => {
	const a = mercator({lat: bbox.minLat, lon: bbox.minLon})
	const b = mercator({lat: bbox.maxLat, lon: bbox.maxLon})
	const w = Math.abs(a.x * 1000 - b.x * 1000)
	const h = Math.abs(a.y * 1000 - b.y * 1000)
	return w / h
}

const getTile = (layer, bbox) => {
	return request({
		request: 'GetMap',
		layers: layer.key,
		crs: layer.crs,
		bbox: formatBbox(bbox),
		width: '500',
		height: Math.round(500 / tileRatio(bbox)) + '',
		styles: '',
		transparent: 'true',
		format: layer.format
	})
}

module.exports = getTile
