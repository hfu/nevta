const {exec} = require('child_process')
const target = [
  ['50m', 'physical', 'land'],
  ['10m', 'cultural', 'populated_places']
]
target.forEach(r => {
  [scale, category, theme] = r
  url = `http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/${scale}/${category}/ne_${scale}_${theme}.zip`
  exec(`wget -c -O src/${theme}.zip ${url}`, (err, stdout, stderr) => {
    if(err) console.error(err.stack)
    console.error(stderr)
  })
})
