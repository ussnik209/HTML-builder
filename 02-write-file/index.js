const path = require('path')
const fs = require('fs')
const { stdin, stdout } = require('process')
const readline = require('readline')


showHello()

const writeStream = fs.createWriteStream(path.resolve(__dirname, 'write.txt'))
const rl = readline.createInterface({ 
  input: stdin,
  output: stdout
})

rl.on('line', (input) => {
  if (input == 'exit') {
    showBye()
    rl.close()
  } else {
    writeStream.write(input + '\n')
  }
})
rl.on('SIGINT', () => {
  showBye()
  rl.close()
})


function showBye() {
  process.stdout.write('\n***Have a nice day!')
}

function showHello() {
  process.stdout.write('\n\n***Hello user! Enter text, that you wont write to file:' + '\n\n')
}