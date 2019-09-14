const escpos = require('escpos');
const Utils = require('./utils').Utils;
// Select the adapter based on your printer type
const deviceUSB  = new escpos.USB();
// const device  = new escpos.Network('localhost');
// const device  = new escpos.Serial('/dev/usb/lp0');
 
const options = { encoding: "UTF-16BE" /* default */ }
// encoding is optional
 
const printerUSB = new escpos.Printer(deviceUSB, options);

var Thermal = function () {};

Thermal.printUSB = function printUSB(code, clientCode, details) {
    deviceUSB.open(function() {
        let str1 = Utils.cleanAccents('Phở Ly');
        let str2 = Utils.cleanAccents('276/17 thống nhất, p7, Gò Vấp');
        printerUSB
        .font('b')
        .align('ct')
        .size(2, 1)
        .text(str1)
        .size(1, 1)
        .text(str2)
        .barcode(code, 'EAN13', {width: 1, height: 70, position: "OFF", includeParity: false})
        .size(1, 3)
        .text('----------------------------')
        .size(1, 1);
        let total = 0;
        for (let detail of details) {
            printerUSB.tableCustom([ 
                { text: detail.product, align:"LEFT", width: 0.33 },
                { text: '' + detail.amount, align:"RIGHT", width: 0.33 }
              ]);
        
            printerUSB.tableCustom([ 
                { text: '', align:"LEFT", width: 0.33 },
                { text: '' + detail.money, align: "RIGHT", width: 0.33 },
              ]);
            total += detail.money;
        }
        printerUSB.text('----------------------------');
        printerUSB.tableCustom([ 
            { text: '', align:"LEFT", width: 0.33 },
            { text: 'Total: ' + total, align:"RIGHT", width: 0.33 }
          ]);
        printerUSB.qrcode(clientCode);
        printerUSB.cut()
        .close();
      });
} 

exports.Thermal = Thermal;

  