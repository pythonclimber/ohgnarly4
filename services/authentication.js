var exports = module.exports = {};
var crypto = require('crypto');
var password = "Tbontb#3";
var algorithm = "aes192";

exports.encryptString = function(input) {
    var cipher = crypto.createCipher(algorithm, password);
    var encrypted = cipher.update(input, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
};

exports.decryptString = function(input) {
    var decipher = crypto.createDecipher(algorithm, password);
    var decrypted = '';

    decipher.on('readable', function() {
        var data = decipher.read();

        if (data) {
            decrypted += data.toString();
        }
    });

    decipher.on('end', function() {
    });

    decipher.write(input, 'base64');
    decipher.end();
    return decrypted;
};

//console.log(exports.encryptString('IfYouKnowWhatIMean'));