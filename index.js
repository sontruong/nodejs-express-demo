const express = require('express') 
const path = require('path')

var thermalPrinter = require('./common/thermal.printer.service').Thermal;
const publicDirectoryPath = path.join(__dirname, 'public')
console.log('-----: ' + publicDirectoryPath);

const app = express()
app.use('/static', express.static(publicDirectoryPath))

app.get('', (req, res) => { 
    res.send('Hello express!') 
}) 


app.get('/printthermal', (req, res) => { 
    thermalPrinter.printUSB('123456789012', 'HGBCF8643243', [{"product": "To pho lon", "amount": 1, "money": 35000}, {"product": "To pho nho", "amount": 1, "money": 25000}]);
    res.send('Hello express!') 
}) 

app.get('/partners', (req, res) => { 
    res.send('Your partners') 
})

app.get("/peoples", (req, res, next) => {
    res.json(["Son","Tu","Thinh","Thanh"]);
});

app.listen(3000, () => { 
    console.log('Server is up on port 3000.') 
})
