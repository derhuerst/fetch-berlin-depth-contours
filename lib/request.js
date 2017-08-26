'use strict'

const {stringify} = require('qs')
const Promise = require('pinkie-promise')
const {fetch} = require('fetch-ponyfill')({Promise})

const endpoint = 'https://fbinter.stadt-berlin.de/fb/wms/senstadt/gewmor2'
const userAgent = 'https://github.com/derhuerst/fetch-berlin-water-depths'

const request = (query) => {
	query = Object.assign({
		service: 'WMS',
		version: '1.3.0'
	}, query)

	return fetch(endpoint + '?' + stringify(query), {
		mode: 'cors', redirect: 'follow',
		headers: {'User-Agent': userAgent}
	})
	.then((res) => {
		if (!res.ok) {
			const err = new Error(res.statusText)
			err.statusCode = res.status
			throw err
		}
		return res
	})
}

module.exports = request
