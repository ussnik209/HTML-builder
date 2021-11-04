const path = require('path')
const { readdir, readFile, open, writeFile } = require('fs/promises')

function mergeStyles(srcPath, destPath, destFileName) {

  readdir(srcPath, { withFileTypes: true })
    .then((files) => {

      let promiseArray = []
      for (const file of files) {

        const pathInfo = path.parse(path.resolve(srcPath, file.name))
        if (file.isFile && pathInfo.ext == '.css') {

          promiseArray.push(
            readFile(path.resolve(srcPath, file.name))
            .then((data) => {

              return data.toString()
            }, (err) => {

              throw err
            })
          )
        }
      }

      Promise.all(promiseArray)
        .then(values => {

          open(path.resolve(destPath, destFileName), 'w')
            .then(file => {

              writeFile(file, values.join('\n'))
                .finally(() => {

                  file.close()
                })
            })
            .catch(err => {
              if (err) {

                console.error(err)
              }
            })
        })
    }, (err) => {

      console.log(err)
    })
}

mergeStyles(
  path.resolve(__dirname, 'styles'),
  path.resolve(__dirname, 'project-dist'),
  'bundle.css'
)

module.exports = {
  mergeStyles
}