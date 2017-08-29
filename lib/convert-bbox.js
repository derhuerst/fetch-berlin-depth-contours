'use strict'

const proj4 = require('proj4')
const epsg4326 = require('epsg-index/s/4326.json')
const epsg3068 = require('epsg-index/s/3068.json')

const wgs84ToSoldner = proj4(epsg4326.proj4, epsg3068.proj4)

const convertBboxToSoldner = (wgs84) => {
	const min = wgs84ToSoldner.forward({x: wgs84.minLon, y: wgs84.minLat})
	const max = wgs84ToSoldner.forward({x: wgs84.maxLon, y: wgs84.maxLat})

	return {
		minLon: min.x,
		minLat: min.y,
		maxLon: max.x,
		maxLat: max.y
	}
}

const convertBboxToWgs84 = (soldner) => {
	const min = wgs84ToSoldner.inverse({x: soldner.minLon, y: soldner.minLat})
	const max = wgs84ToSoldner.inverse({x: soldner.maxLon, y: soldner.maxLat})

	return {
		minLon: min.x,
		minLat: min.y,
		maxLon: max.x,
		maxLat: max.y
	}
}

module.exports = {convertBboxToSoldner, convertBboxToWgs84}
