const { readdir, mkdir, copyFile } = require('fs/promises');
const path = require('path');

function copyDir(srcPath, destPath) {

  readdir(srcPath, { withFileTypes: true })
    .then((files) => {

      mkdir(destPath, { recursive: true })
      for (const file of files) {
        if (file.isFile()) {
          copyFile(
            path.resolve(srcPath, file.name),
            path.resolve(destPath, file.name)
          )
        } else {

          copyDir(
            path.resolve(srcPath, file.name),
            path.resolve(destPath, file.name)
          )
        }
      }
    }, (err) => {

      console.log(err)
    })
    .catch(err => {
      
      console.log(err)
    })
}


copyDir(path.resolve(__dirname, 'files'), path.resolve(__dirname, 'files-copy'))

module.exports = {
  copyDir
}