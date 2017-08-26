'use strict'

const assert = require('assert')

const request = require('./request')
const parseCapabilities = require('./parse-capabilities')

const PNG = 'image/png'
const WGS84 = 'EPSG:4326'

// todo: make this robust
const isContourLinesLayer = (layer) => {
	return layer.title.toLowerCase() === 'tiefenlinien'
}

const assertCapabilities = () => {
	return request({request: 'GetCapabilities'})
	.then((res) => res.text())
	.then(parseCapabilities)
	.then(({formats, layers}) => {
		assert.ok(formats.includes(PNG), 'no PNG layer available')
		const contourLinesLayer = layers.find(isContourLinesLayer)
		assert.ok(contourLinesLayer, 'no contour lines layer layer found')
		const wgs84Crs = contourLinesLayer.crses.includes(WGS84)
		assert.ok(wgs84Crs, 'WGS84 not supported at contour lines layer')
		const wgs84Bbox = contourLinesLayer.bboxes.find(b => b.crs === WGS84)
		assert.ok(wgs84Bbox, 'WGS84 not supported at contour lines layer')

		return Object.assign({}, contourLinesLayer, {
			format: PNG,
			crs: WGS84,
			bbox: wgs84Bbox
		})
	})
}

module.exports = assertCapabilities
