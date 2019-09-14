const express = require('express') 
const path = require('path')
var pug = require('pug');

// var thermalPrinter = require('./common/thermal.printer.service').Thermal;
const publicDirectoryPath = path.join(__dirname, 'public')
console.log('-----: ' + publicDirectoryPath);


const app = express()
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use('/static', express.static(publicDirectoryPath))

app.get('', (req, res) => { 
    res.send('Hello express!') 
}) 


// app.get('/printthermal', (req, res) => { 
//     thermalPrinter.printUSB('123456789012', 'HGBCF8643243', [{"product": "To pho lon", "amount": 1, "money": 35000}, {"product": "To pho nho", "amount": 1, "money": 25000}]);
//     res.send('Hello express!') 
// }) 

app.get('/partners', (req, res) => { 
    res.send('Your partners') 
})

app.get("/peoples", (req, res, next) => {
    res.json(["Son","Tu","Thinh","Thanh"]);
});

app.get("/pug", (req, res, next) => {
    res.render('demo', { pageTitle: 'Demo', youAreUsingPug: true, message: 'Hello there!' });
});

// catch 404 and forward to error handler
app.use(function(req, res) {
    console.log('----404: ');
    res.status(404).render('error', { pageTitle: '404', youAreUsingPug: true, message: 'Page not found!' });
});
  
// Handle 500
app.use(function(error, req, res, next) {
    console.log('----500: ' + JSON.stringify(error));
    res.status(500).render('error', { pageTitle: '404', youAreUsingPug: true, message: JSON.stringify(error) });
});

app.listen(3000, () => { 
    console.log('Server is up on port 3000.') 
})
