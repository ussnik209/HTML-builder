const path = require('path')
const fsPromises = require('fs/promises')
const ms = require('../05-merge-styles/index.js')
const cp = require('../04-copy-directory/index.js')

function buildPage() {

  const distPath = path.resolve(__dirname, 'project-dist')

  mkdirPromise = fsPromises.mkdir(distPath, { recursive: true })
  mkdirPromise
    .then(() => {

      ms.mergeStyles(
        path.resolve(__dirname, 'styles'),
        path.resolve(__dirname, distPath),
        'style.css'
      )
    })
    .catch(err => {

      console.log(err)
    })

  mkdirPromise
    .then(() => {

      cp.copyDir(
        path.resolve(__dirname, 'assets'),
        path.resolve(distPath, 'assets')
      )
    })
    .catch(err => {

      console.log(err)
    })

  // let templateArray = []
  mkdirPromise
    .then(() => {
      return fsPromises.readdir(path.resolve(__dirname, 'components'))
    })
    .then((components) => {
      let promiseArray = [fsPromises.readFile(path.resolve(__dirname, 'template.html'))]
      for (const component of components) {
        promiseArray.push(
          fsPromises.readFile(path.resolve(__dirname, 'components', component))
          .then((html) => {
            return {
              html: html.toString(),
              name: component
            }
          })
        )
      }

      return Promise.all(promiseArray)


    })
    .then(arr => {

      const templateArray = arr[0].toString().split('\n')
      const components = arr.slice(1, arr.length)

      return templateArray.map(function(str) {

        if (str.match(/^\s*{{/)) {

          const templateName = str.split(/[^a-z]/).join('') + '.html'
          const component = components.find(component => component.name == templateName)
          if (component) {

            return component.html
          }
        } else {

          return str
        }
      })
    })
    .then(templateArray => {

      fsPromises.writeFile(path.resolve(distPath, 'index.html'), templateArray.join('\n'))
    })
    .catch(err => {

      console.log(err)
    })

}

buildPage()