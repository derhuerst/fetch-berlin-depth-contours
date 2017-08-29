'use strict'

const assert = require('assert')

const request = require('./request')
const parseCapabilities = require('./parse-capabilities')

const PNG = 'image/png'
const SOLDNER = 'EPSG:3068'

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
		const soldnerCrs = contourLinesLayer.crses.includes(SOLDNER)
		assert.ok(soldnerCrs, 'SOLDNER not supported at contour lines layer')
		const soldnerBbox = contourLinesLayer.bboxes.find(b => b.crs === SOLDNER)
		assert.ok(soldnerBbox, 'SOLDNER not supported at contour lines layer')

		return Object.assign({}, contourLinesLayer, {
			format: PNG,
			crs: SOLDNER,
			bbox: soldnerBbox
		})
	})
}

module.exports = assertCapabilities
