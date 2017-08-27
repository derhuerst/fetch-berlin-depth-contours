'use strict'

const path = require('path')
const fs = require('fs')

const saveToDir = (dir) => {
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

	return saveTile
}

module.exports = saveToDir
