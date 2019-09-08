const validator = require('validator')
const fs = require('fs')
const chalk = require('chalk')

fs.writeFileSync('test.txt', 'Hello Son')

console.log(validator.isURL('https/mead.io')) // Print: false
console.log(validator.isURL('https://mead.io')) // Print: false
console.log(validator.isNumeric('222222')) // Print: true

const greenMsg = chalk.green.inverse.bold('Success!')
console.log(greenMsg)

