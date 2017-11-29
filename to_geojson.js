const shapefile = require('shapefile')
const layers = ['ne_50m_land', 'ne_10m_populated_places']
const to_delete = [
  'scalerank', 'featurecla'
]

layers.forEach(layer => {
  shapefile.open(`work/${layer}.shp`, undefined, {encoding: 'utf-8'})
    .then(s => s.read()
      .then(function work(r) {
        if(r.done) return
        r.value.tippecanoe = {
          "layer": layer,
          "minzoom": (r.value.properties.min_zoom > 6) ?
            6 : r.value.properties.min_zoom
        }
        for(let v in r.value.properties) {
          if(to_delete.indexOf(v) != -1) {
            delete r.value.properties[v]
          }
        }
        console.log(JSON.stringify(r.value))
        return s.read().then(work)
      }))
    .catch(err => {console.error(err.stack)})
})
