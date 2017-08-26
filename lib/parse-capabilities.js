'use strict'

const parseXML = require('xml-js/lib/xml2js')

const byTag = (el, tag) => {
	if (!el || !Array.isArray(el.elements)) return null
	return el.elements.find(el => el.name === tag) || null
}
const byType = (el, type) => {
	if (!el || !Array.isArray(el.elements)) return null
	return el.elements.find(el => el.type === type) || null
}
const text = (el) => {
	return el && el.text || null
}
const float = (str) => {
	if (!str) return null
	const float = parseFloat(str)
	return Number.isNaN(float) ? null : float
}

const parseBbox = (bbox) => {
	return {
		crs: bbox.attributes.CRS,
		minX: parseFloat(bbox.attributes.minx),
		minY: parseFloat(bbox.attributes.miny),
		maxX: parseFloat(bbox.attributes.maxx),
		maxY: parseFloat(bbox.attributes.maxy)
	}
}

const parseLayer = (layer) => {
	const key = text(byType(byTag(layer, 'Name'), 'text'))
	const title = text(byType(byTag(layer, 'Title'), 'text'))
	const description = text(byType(byTag(layer, 'Abstract'), 'text'))

	// coordinate systems
	const crses = layer.elements
		.filter(el => el.name === 'CRS')
		.map(el => byType(el, 'text'))
		.map(text)

	const bboxes = layer.elements
		.filter(el => el.name === 'BoundingBox')
		.map(parseBbox)

	const minScale = float(text(byType(byTag(layer, 'MinScaleDenominator'), 'text')))
	const maxScale = float(text(byType(byTag(layer, 'MaxScaleDenominator'), 'text')))

	return {key, title, description, crses, bboxes, minScale, maxScale}
}

const parseCapabilities = (xml) => {
	const root = parseXML(xml)
	const cap = byTag(byTag(root, 'WMS_Capabilities'), 'Capability')

	const getMap = byTag(byTag(cap, 'Request'), 'GetMap')
	const formats = getMap
		? getMap.elements
			.map(el => el.elements[0])
			.filter(el => el.type === 'text')
			.map(text)
		: null

	const rootLayer = byTag(cap, 'Layer')
	const layers = rootLayer
		? rootLayer.elements
			.filter(el => el.name === 'Layer')
			.map(parseLayer)
		: null

	return {formats, layers}
}

module.exports = parseCapabilities
