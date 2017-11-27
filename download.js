const fetch = require('node-fetch')
const unzip = require('unzip')
const target = [
  ['50m', 'physical', 'land'],
  ['10m', 'cultural', 'populated_places']
]
target.forEach(r => {
  [scale, category, theme] = r
  url = `http://www.naturalearthdata.com/http//www.naturalearthdata.com/` +
    `download/${scale}/${category}/ne_${scale}_${theme}.zip`,
  fetch(url)
    .then(resp => {
      resp.body.pipe(unzip.Extract({path: 'work'}))
    })
    .catch(err => {
      console.error(err)
    })
})
