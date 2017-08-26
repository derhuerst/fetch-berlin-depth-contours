# fetch-berlin-depth-contours

**Fetch [depth contour lines](https://en.wikipedia.org/wiki/Nautical_chart#Depths_and_heights) of [Berlin bodies of water](https://fbinter.stadt-berlin.de/fb/index.jsp?loginkey=zoomStart&mapId=gewmor2@senstadt&bbox=41013,12977,41197,13034).**

*Warning*: This is a rather hacky [WMS](http://docs.geoserver.org/latest/en/user/services/wms/index.html) client and you need to change its parameters inside `index.js`. I should probably split this into focused modules and publish them on npm.

[![npm version](https://img.shields.io/npm/v/fetch-berlin-depth-contours.svg)](https://www.npmjs.com/package/fetch-berlin-depth-contours)
[![build status](https://img.shields.io/travis/derhuerst/fetch-berlin-depth-contours.svg)](https://travis-ci.org/derhuerst/fetch-berlin-depth-contours)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/fetch-berlin-depth-contours.svg)
[![chat on gitter](https://badges.gitter.im/derhuerst.svg)](https://gitter.im/derhuerst)


## Installing

```shell
npm install derhuerst/fetch-berlin-depth-contours
```


## Usage

Edit `index.js` and run it:

```shell
node index.js
```


## Contributing

If you have a question or have difficulties using `fetch-berlin-depth-contours`, please double-check your code and setup first. If you think you have found a bug or want to propose a feature, refer to [the issues page](https://github.com/derhuerst/fetch-berlin-depth-contours/issues).
