'use strict'

const path = require('path')
const fs = require('fs')

const downloadAll = require('./lib/download-all')

const zoom = 17
const size = 1000
const concurrency = 8
const dir = path.join(__dirname, 'out')

const saveTile = (tile, res) => {
	return res.buffer()
	.then(buf => new Promise((yay, nay) => {
		const dest = path.join(dir, tile.join('-') + '.png')

		fs.writeFile(dest, buf, (err) => {
			if (err) nay(err)
			else yay()
		})
	}))
}

const onSuccess = (_, job) => {
	console.error('success!', job.title)
}
const onFailure = (err) => {
	console.error(err)
	process.exitCode = 1
}

downloadAll(saveTile, onSuccess, onFailure, {zoom, size, concurrency})
.catch((err) => {
	console.error(err)
	process.exit(1)
})
