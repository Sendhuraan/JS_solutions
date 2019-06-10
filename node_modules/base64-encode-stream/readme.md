# base64-encode-stream

A transform stream that converts input to base64. 

## Install

```sh
npm install --save base64-encode-stream
```

## Example

```js
'use strict'

var encode = require('base64-encode-stream')

process.stdin.pipe(encode()).pipe(process.stdout)
```

## API

```js
require('base64-encode-stream') => () => EncodingStream
```

## Test

```sh
npm test
```

## Acknowledgements

* Kindly sponsored by [nearForm](http://nearform.com)

## License

MIT

