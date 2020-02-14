
const formidable = require('formidable');
const util = require('util');

module.exports = function upload(req, res) {

    const form = formidable({ multiples: true });
    const fields = {};

    form
        .on('error', (err) => {
            console.error(err);
            res.writeHead(500, { 'content-type': 'text/plain' });
            res.end(`error:\n\n${util.inspect(err)}`);
        })
        .on('file', (name, file) => {
            console.log(name, file);
        })
        .on('field', (field, value) => {
            console.log(field, value);
            fields[field] = value;
        })
        .on('end', () => {
            console.log('-> post done from "end" event');
            res.writeHead(200, { 'content-type': 'text/plain' });
            res.end(`received fields:\n\n${util.inspect(fields)}`);
        });

    form.parse(req);


};