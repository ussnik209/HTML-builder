const { readdir } = require('fs/promises');
const fs = require('fs')
const path = require('path')


function showFiles() {
  readdir(path.resolve(__dirname, 'secret-folder'), { withFileTypes: true })
    .then((files) => {

      for (const file of files) {
        if (file.isFile) {
          fs.stat(path.join(__dirname, 'secret-folder', file.name), (err, stats) => {
            if (err) {
              throw err
            } else {
              pathInfo = path.parse(path.join(__dirname, 'secrete-folder', file.name))
              console.log(`${pathInfo.name} - ${pathInfo.ext.slice(1)} - ${stats.size / 1000}kb`)
            }
          })
        }
      }

    })
}


try {
  showFiles()
} catch (error) {
  console.error(error)
}