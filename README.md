<div align="center">
<br />
  <p>
    <img src="https://i.imgur.com/qKADpoR.png" alt="tankionline.js"/>
  </p>
  <br />
  <p>
    <a href="https://github.com/GeopJr/tankionline.js/blob/master/LICENSE"><img src="https://img.shields.io/badge/LICENSE-MIT-000000.svg" alt="MIT" /></a>
  </p>
  <br />
  <p>An API wrapper for Tanki Online ratings.</p>
</div>

# Install
```
$ npm i tankionline.js
```

# Example
```
const tankionline = require("tankionline.js");

const Ratings = new tankionline('GeopJr', 'en');

Ratings.stats().then(data => {
console.log(data)
// JSON object
console.log(data.kd)
// 2.99
}).catch(error => { console.log(error)});
```
#### More info in the [Wiki](https://github.com/GeopJr/tankionline.js/wiki)

<div align="center">
  <br />
  <p>
    <img src="https://i.imgur.com/HEtVbUc.png" alt="info"/>
  </p>
  </div>
