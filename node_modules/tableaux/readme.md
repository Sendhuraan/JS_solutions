# tableaux

CLI table + auxiliary TTY write utils like dim, bold, newline and arrow

## install

```sh
npm install tableaux
```

## Usage

```js
tableaux(...columnHeader) => writeFn
```

### `columnHeader`

The `columnHeader` is an object which can have the following possible properties:

* `name` (string), required
* `size` (number)
* `align` (string), 'left', 'right' or 'center', default='left'
* `color` (string or function), `function(val, row) { return color; }`
* `format` (function), `function(val, row) { return newVal; }`

Multiple column headers can be passed, 

```js
tableaux({name: 'Title'}, {name: 'Author'}, {name: 'ISBN'})
```

### `writeFn(...columnValues)`

The returned value is a function, each argument corresponds to a column, 

```js
var write = tableaux({name: 'Title'}, {name: 'Author'}, {name: 'ISBN'})

write('War and Peace', 'Leo Tolstoy', 9789722219242)
```

The `writeFn` also has several convenience methods

#### `writeFn.dim(str)`

Output the string with the dim ANSI escape code

#### `writeFn.bold(str)`

Output the string with the bright ANSI escape code

#### `writeFn.newline()`

Write a newline character (`\n`)

#### `writeFn.spaces(n)`

Write `n` number of spaces

#### `writeFn.arrow(leftPad = 3, rightPad = 1)`

Output a `↳` character, specify `leftPad` and `rightPad` params
for padding around the arrow


## Example

```js
var tableaux = require('tableaux')

var write = tableaux({name: 'Title'}, {name: 'Author'}, {name: 'ISBN'})

write('War and Peace', 'Leo Tolstoy', '9789722219242')
alts(['9783538065437', '9781586638146', '9788495303509'])
write('Gone with the Wind', 'Margaret Mitchell', '9789630753661')
alts(['9784794600448', '9783548248820', '9785750706471'])
write.newline()

function alts(isbns) {
  write.arrow()
  write.bold('Alt ISBNS')
  isbns.forEach(write.dim)
  write.newline()
}
```

## License

MIT

## Acknowledgements

* sponsored by [nearForm](http://nearform.com)

