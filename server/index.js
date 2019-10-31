const express      = require('express');
const path         = require('path');
const config       = require('dotenv').config().parsed;

const app = express();

app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, '../dist', 'index.html'))
})

app.listen(config.DEVSERVER_LISTEN_PORT, config.DEVSERVER_LISTEN_IP, () => {
    console.log(`
        =====================================================
        ${ new Date().toString() }
                        Server started at 
                        Address: ${config.DEVSERVER_LISTEN_PORT}
                        Port:    ${config.DEVSERVER_LISTEN_IP}
        =====================================================
    `);
});
