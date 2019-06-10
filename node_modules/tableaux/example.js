var tableaux = require('./')

var write = tableaux({name: 'Title'}, {name: 'Author'}, {name: 'ISBN'})

write('War and Peace', 'Leo Tolstoy', '9789722219242')
alts(['9783538065437', '9781586638146', '9788495303509'])
write('Gone with the Wind', 'Margaret Mitchell', '9789630753661')
alts(['9784794600448', '9783548248820', '9785750706471'])
write.newline()

function alts (isbns) {
  write.arrow()
  write.bold('Alt ISBNS')
  isbns.forEach(write.dim)
  write.newline()
}
