const wget = require('node-wget')
const fs = require('fs')
const target = [
  ['50m', 'physical', 'land'],
  ['10m', 'cultural', 'populated_places']
]
target.forEach(r => {
  [scale, category, theme] = r
  arg = {
    url: `http://www.naturalearthdata.com/http//www.naturalearthdata.com/` +
      `download/${scale}/${category}/ne_${scale}_${theme}.zip`,
    dest: `src/${theme}.zip`
  }
  fs.open(arg.dest, 'r', (err, fd) => {
    if(err) {
      wget(arg, (err, resp, body) => {
        if(err) console.error(err.stack)
      })
    } else {
      console.log(`skip ${arg.dest} because it exists`)
    }
  })

})
