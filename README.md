<div align="center">
<br />
  <p>
    <a href="https://github.com/GeopJr/tankionline.js/blob/master/LICENSE"><img src="https://img.shields.io/badge/LICENSE-MIT-000000.svg" alt="MIT" /></a>
    <a href="https://www.npmjs.com/package/tankionline.js"><img src="https://img.shields.io/npm/v/tankionline.js.svg?maxAge=3600"></a>
    <a href="https://www.npmjs.com/package/tankionline.js"><img src="https://img.shields.io/npm/dt/tankionline.js.svg?maxAge=3600"></a>
    <a href="https://www.npmjs.com/package/tankionline.js"><img src="https://travis-ci.org/GeopJr/tankionline.js.svg?branch=master"></a>
  </p>
  <br />
  <p>
    <img src="https://i.imgur.com/qKADpoR.png" alt="tankionline.js"/>
  </p>
  <br />
  <p>
    <a href="https://www.npmjs.com/package/tankionline.js"><img src="https://nodei.co/npm/tankionline.js.png?compact=true"></a>
  </p>
  <br />
  <p>An API wrapper for Tanki Online ratings.</p>
</div>

# Install
```
$ npm i tankionline.js
```

# Examples
### Ratings
```js
// Initialize
const tankionline = require("tankionline.js");

const Ratings = new tankionline.ratings('GeopJr', 'en');

Ratings.stats().then(data => {
console.log(data)
// JSON object
console.log(data.kd)
// 2.99
}).catch(error => { console.log(error)});
// Catch errors
```
### Ranks
```js
// Initialize
const tankionline = require("tankionline.js");

const Rank = new tankionline.ranks(true, 1);

Rank.then(data => {
console.log(data.rank.name)
//=> Recruit
console.log(data.rank.image)
//=> https://i.imgur.com/0qfIM1Z.png
}).catch(error => { console.log(error)});
// Catch errors
```
### Top
```js
// Initialize
const tankionline = require("tankionline.js");

const Top = new tankionline.top("crystals");

Rank.then(data => {
console.log(data.top[0].value)
//=> 51120
}).catch(error => { console.log(error)});
// Catch errors
```
#### More info in the [Wiki](https://github.com/GeopJr/tankionline.js/wiki)

<div align="center">
  <br />
  <p>
    <img src="https://i.imgur.com/HEtVbUc.png" alt="info"/>
  </p>
  </div>
