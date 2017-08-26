'use strict'

const request = require('./request')

const getTile = (layer, bbox) => {
	return request({
		request: 'GetMap',
		layers: layer.key,
		crs: layer.crs,
		bbox: bbox.join(','),
		width: '500', height: '500', // todo: aspect ration
		styles: '',
		transparent: 'true',
		format: layer.format
	})
}

module.exports = getTile
