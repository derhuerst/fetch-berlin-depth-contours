# fetch-berlin-depth-contours

**Fetch all tiles showing [depth contour lines](https://en.wikipedia.org/wiki/Nautical_chart#Depths_and_heights) of [Berlin bodies of water](https://fbinter.stadt-berlin.de/fb/index.jsp?loginkey=zoomStart&mapId=gewmor2@senstadt&bbox=41013,12977,41197,13034).**

*Warning*: This is a rather hacky [WMS](http://docs.geoserver.org/latest/en/user/services/wms/index.html) client. I should probably split this into focused modules and publish them on npm.

[![npm version](https://img.shields.io/npm/v/fetch-berlin-depth-contours.svg)](https://www.npmjs.com/package/fetch-berlin-depth-contours)
[![build status](https://img.shields.io/travis/derhuerst/fetch-berlin-depth-contours.svg)](https://travis-ci.org/derhuerst/fetch-berlin-depth-contours)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/fetch-berlin-depth-contours.svg)
[![chat on gitter](https://badges.gitter.im/derhuerst.svg)](https://gitter.im/derhuerst)


## Installing

```shell
npm install derhuerst/fetch-berlin-depth-contours
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


## API

```js
download(saveTile, onSuccess, onFailure, [opt])
```

`saveTile(tile, res)` should store the tile somewhere, as `fetch-berlin-depth-contours` doesn't do this. `tile` is in [the common format `[x, y, zoom]`](https://www.npmjs.com/package/tilebelt).`res` is a [`fetch` `Response` object](https://developer.mozilla.org/en-US/docs/Web/API/Response).

`onSuccess(result, job)` and `onFailure(err)` may report the progress.

`opt` is an optional object that overrides these defaults:

```js
{
	zoom: 18,
	size: 500,
	concurrency: 4
}
```

`download` returns a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) that rejects if something fails badly. Note that it does not reject if a single tile can't be fetched, instead it will call `onFailure`.


## Contributing

If you have a question or have difficulties using `fetch-berlin-depth-contours`, please double-check your code and setup first. If you think you have found a bug or want to propose a feature, refer to [the issues page](https://github.com/derhuerst/fetch-berlin-depth-contours/issues).
