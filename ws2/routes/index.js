var express = require('express');
var multer = require('multer')
var router = express.Router();
var fs = require('fs');
const axios = require('axios');

var originalFileName;
var originalFileNameExt;

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, '');
},
filename: function (req, file, cb) {
  cb(null, file.originalname);
}
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "text/plain" || file.mimetype == "text/plain" || file.mimetype == "text/plain") {
      originalFileNameExt = file.originalname;
      originalFileName = originalFileNameExt.slice(0, -4);
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .txt format allowed!'));
    }
  }
}).single('file');

function deleteFile(fileName) {
  try {
    fs.unlinkSync(fileName);
  } catch(err) {
    console.error(err);
  }
}

function formatFiles() {
  try {  
    var data = fs.readFileSync(originalFileNameExt, 'utf8');   
  } catch(err) {
    console.log('Error:', err.stack);
  }

  if (data) {
    var ibans = data.toString().split(/[\r\n]+/);

    for(var i = 0; i < ibans.length; ++i) {
      axios.get("http://localhost:9000?iban=" + ibans[i])
      .then(res => {
        console.log(res.data);
        
        var tempData = res.data.split(';');
  
        fs.appendFile(originalFileName + "_valid.csv", tempData[0] + ';' + tempData[1] + '\n', function(err) {
          if(err) {
              return console.log(err);
          }
        });
  
        if (tempData[1] == "Valid") {
          fs.appendFile(originalFileName + "_bank.csv", tempData[0] + ';' + tempData[2] + '\n', function(err) {
            if(err) {
                return console.log(err);
            }
          });
        } else {
          fs.appendFile(originalFileName + "_bank.csv", tempData[0] + '\n', function(err) {
            if(err) {
                return console.log(err);
            }
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
    }
  
    deleteFile(originalFileNameExt);
  } else {
    return console.log("File read error");
  }
}

router.post('/',function(req, res) {
     
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    formatFiles();
    return res.status(200).send(req.file);
  })

});

router.get('/iban_valid',function(req, res) {
  res.download(originalFileName + "_valid.csv", function(err){
    if (err) {
      console.log(err);
    } else {
      console.log("File sent");
      deleteFile(originalFileName + "_valid.csv");
    }
  });
});
router.get('/iban_bank',function(req, res) {
  res.download(originalFileName + "_bank.csv", function(err){
    if (err) {
      console.log(err);
    } else {
      console.log("File sent");
      deleteFile(originalFileName + "_bank.csv");
    }
  });
});

module.exports = router;
