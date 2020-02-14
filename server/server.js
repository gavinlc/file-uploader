const express = require('express');
const cors = require('cors')

const server = express();
const upload = require('./upload')

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
};

server.use(cors(corsOptions));

server.post('/upload', upload);

server.listen(8000, () => {
    console.log('Server started!')
});