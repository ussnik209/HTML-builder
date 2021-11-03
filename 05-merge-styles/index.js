const path = require('path')
const { readdir, readFile, open, writeFile } = require('fs/promises')

function mergeStyles() {

  const srcPath = path.resolve(__dirname, 'styles')
  const destPath = path.resolve(__dirname, 'project-dist')
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

        open(path.resolve(destPath, 'bundle.css'), 'w')
          .then(file => {

            writeFile(file, values.join('\n'))
            .finally(() => {
              
              file.close()
            })
          })
          .finally(err => {

            if (err) {

              console.error(err)
            } else {

              console.log('***Merge styles completed.')
            }

          })
      })
  }, (err) => {

    console.log(err)
  })
}

mergeStyles()