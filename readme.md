# fetch-berlin-depth-contours

**Fetch all tiles showing [depth contour lines](https://en.wikipedia.org/wiki/Nautical_chart#Depths_and_heights) of [Berlin bodies of water](https://fbinter.stadt-berlin.de/fb/index.jsp?loginkey=zoomStart&mapId=gewmor2@senstadt&bbox=41013,12977,41197,13034).**

*Warning*: The tiles will be in the [`EPSG:3068` reference system](https://epsg.io/3068).

*Warning*: This is a rather hacky [WMS](http://docs.geoserver.org/latest/en/user/services/wms/index.html) client. I should probably split this into focused modules and publish them on npm.

[![npm version](https://img.shields.io/npm/v/fetch-berlin-depth-contours.svg)](https://www.npmjs.com/package/fetch-berlin-depth-contours)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/fetch-berlin-depth-contours.svg)
[![chat on gitter](https://badges.gitter.im/derhuerst.svg)](https://gitter.im/derhuerst)


## Installing

```shell
npm install fetch-berlin-depth-contours
```


## Usage

```js
const download = require('fetch-berlin-depth-contours')

const dir = path.join(__dirname, 'out')
const saveTile = (tile, res) => {
	return res.buffer()
	.then(buf => {
		// write to disk here
	})
}

const onSuccess = (_, job) => {
	console.info('tile downloaded', job.title)
}
const onFailure = (err) => {
	console.error(err)
	process.exitCode = 1
}

download(saveTile, onSuccess, onFailure)
.catch((err) => {
	console.error(err)
	process.exit(1)
})
```

To save all tiles into a directory, you can use the `saveToDir` helper:

```js
const path = require('path')
const saveToDir = require('fetch-berlin-depth-contours/save-to-dir')

const dir = path.join(__dirname, 'tiles')
const saveToFile = saveToDir(dir)
```


## API

```js
download(saveTile, onSuccess, onFailure, [opt])
```

`download` returns a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) that rejects if something fails badly. Note that it does not reject if a single tile can't be fetched, instead it will call `onFailure`.

`saveTile(tile, res)` should store the tile somewhere, as `fetch-berlin-depth-contours` doesn't do this. `tile` is in [the common format `[x, y, zoom]`](https://www.npmjs.com/package/tilebelt).`res` is a [`fetch` `Response` object](https://developer.mozilla.org/en-US/docs/Web/API/Response).

`onSuccess(result, job)` and `onFailure(err)` may report the progress.

`opt` is an optional object that overrides these defaults:

```js
{
	zoom: 18,
	size: 500,
	concurrency: 4,
	bbox: null, // default: bbox that the WMS server provides
	layers: null // default: layer identified by lib/assert-capabilities
}
```

If provided, `opt.bbox` must be in the [`EPSG:4326` reference system a.k.a. WGS 84](https://epsg.io/4326) and look like this:

```js
{minLat: 1.23, minLon: 2.34, maxLat: 3.45, maxLon: 4.56}
```

If provided, `opt.layers` should be an array of layer IDs as strings.


## Contributing

If you have a question or have difficulties using `fetch-berlin-depth-contours`, please double-check your code and setup first. If you think you have found a bug or want to propose a feature, refer to [the issues page](https://github.com/derhuerst/fetch-berlin-depth-contours/issues).
