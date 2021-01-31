var express = require('express');
var router = express.Router();

const banks = Object.freeze({"70440":";Valid;AB SEB Bank", "73000":";Valid;AB SwedBank", "40100":";Valid;Luminor Bank AS (DNB)", "other":";Valid;Unidentified bank"});

router.get('/', function(req, res) {
  function modulo (divident, divisor) {
    var cDivident = '';
    var cRest = '';

    for (var i in divident ) {
        var cChar = divident[i];
        var cOperator = cRest + '' + cDivident + '' + cChar;

        if ( cOperator < parseInt(divisor) ) {
                cDivident += '' + cChar;
        } else {
                cRest = cOperator % divisor;
                if ( cRest == 0 ) {
                    cRest = '';
                }
                cDivident = '';
        }

    }
    cRest += '' + cDivident;
    if (cRest == '') {
        cRest = 0;
    }
    return cRest;
  }

  let iban = req.query.iban;
  var countryCode = "", controlNumber = "", bankCode = "", accountNumber = "";

  if (iban.length == 20) {
    for(var i = 0; i < 2; i++) {
      if (iban[i].toUpperCase() == 'L') {
        countryCode += 21;
      }
      if (iban[i].toUpperCase() == 'T') {
        countryCode += 29;
      }
    }
    if (countryCode != "2129") {
      res.send(iban + ";Invalid");
    }

    for(var i = 2; i < 4; i++) {
      controlNumber += iban[i];
    }
    for(var i = 4; i < 9; i++) {
      bankCode += iban[i];
    }
    for(var i = 9; i < 20; i++) {
      accountNumber += iban[i];
    }

    let transformedIban = bankCode + accountNumber + countryCode + controlNumber;

    if (modulo(transformedIban,97) == 1) {
      if (bankCode == "70440") {
        res.send(iban + banks[70440]);
      } else if (bankCode == "73000") {
        res.send(iban + banks[73000]);
      } else if (bankCode == "40100") {
        res.send(iban + banks[40100]);
      } else {
        res.send(iban + banks.other);
      }
    } else {
      res.send(iban + ";Invalid");
    }
  } else {
    res.send(iban + ";Invalid");
  }
});

module.exports = router;
