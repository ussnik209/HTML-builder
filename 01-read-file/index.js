const path = require('path')
const fs = require('fs')

let readableStream = fs.ReadStream(path.resolve(__dirname, 'text.txt'), 'utf-8')

readableStream.pipe(process.stdout)