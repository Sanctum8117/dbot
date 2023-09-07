const express = require('express');
const server = express();
const port = 3000;

server.all('/', (req, res) => res.send('SanctoraM will stay online'));

function keepAlive(){
server.listen(port, () => console.log(`SanctoraM listening at http://localhost:${port}`));
}

module.exports = keepAlive;