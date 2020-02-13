const IncomingForm = require('formidable').IncomingForm;

module.exports = function (req, res) {
    var data = '';

    req.on('data', function (chunk) {
        data += chunk;
        console.log('on data: ', chunk);
    });

    req.on('end', function () {
        console.log('File uploaded');
        res.writeHead(200);
        res.end();
    });
};