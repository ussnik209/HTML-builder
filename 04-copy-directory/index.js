const { readdir, mkdir, copyFile } = require('fs/promises');
const path = require('path');

function copyDir() {
  const srcPath = path.resolve(__dirname, 'files')
  readdir(srcPath, { withFileTypes: true })
    .then((files) => {
      const destPath = path.resolve(__dirname, 'files-copy')
      mkdir(destPath, { recursive: true })
      for (const file of files) {
        copyFile(
          path.resolve(srcPath, file.name),
          path.resolve(destPath, file.name)
        )
      }
    }, (err) => {
      console.log(err)
    })
}


copyDir()