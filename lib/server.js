/**
 * require and init "Node JS Express" module */
const express = require ('express');
const SERVER = express();

/**
 * validates server port,
 * @param port must be number & at least 4 chars long,
 * returns boolean */
const isPortValid = (port) => {
    if (port && typeof port === 'number') {
        const portAsString = port.toString();

        // port is at least 4 chars
        return portAsString.length > 3;
    }

    return false;
}
/**
 * converts into https port
 * @param defPort, which must be instance of http port,
 * changes its 3 last digits into 443,
 * and returns *443, or undefined if error occurred
 * example: 8000 - 8443 */
const portForHttpsEndWith443 = (defPort) => {
    if (isPortValid(defPort)) {
        defPort = defPort.toString();
        defPort = defPort.replace(/\d{3}$/, '443');
    }
    const httpsPort = Number(defPort);

    if (httpsPort) {
        return httpsPort;
    }

    return undefined;
}
/**
 * retrieves server address from
 * @param serverListener
 * and returns null or startup message */
const startupMessageFrom = (serverListener) => {
    let serverAddress = serverListener
        ? serverListener.address()
        : null;

    serverAddress = typeof serverAddress === 'string'
        ? JSON.parse(serverAddress)
        : serverAddress;

    if (serverAddress) {
        const transferProtocol = serverAddress.port.toString().includes('443') ? 'https' : 'http';
        return '\n\t** ' +
            `Node js server is running on "${transferProtocol}://${serverAddress.address}:${serverAddress.port}/"`;
    }

    return serverAddress;
}
/**
 * start server */
function startupServer(port, controllers = [], inConjunctionRunHttps = false) {
    if (isPortValid(port)) {
        // Controllers routes
        // todo: fix - controllers can not be set for https
        SERVER.use('/', controllers);
        const http = require('http');
        const hostname = 'localhost';
        const httpServer = http.createServer(SERVER);
        const httpServerListener = httpServer.listen(
            port,
            hostname,
            () => console.log(
                startupMessageFrom(httpServerListener)
            )
        );

        if (inConjunctionRunHttps) {
            const https = require('https');
            const fileStream = require('fs');

            const options = {
                key: fileStream.readFileSync('lib/certificates/key.pem'),
                cert: fileStream.readFileSync('lib/certificates/cert.pem'),
            };

            const httpsServer = https
                .createServer(options, SERVER);

            const httpsPort = portForHttpsEndWith443(port);

            if (httpsPort) {
                const httpsServerListener = httpsServer.listen(
                    httpsPort,
                    hostname,
                    () => console.log(
                        startupMessageFrom(httpsServerListener)
                    )
                );
            } else {
                console.error(
                    new Error(
                        'Cannot setup https server, as https port ending with 443 convert failed'
                    )
                );
            }
        }
    } else {
        console.error(
            new Error(
                'Provided port is not valid. Valid port is a number and at least 4 chars long'
            )
        );
    }
}
/**
 * setup server defaults */
SERVER.use(
    express.json()
);
// default server index route
SERVER.get('/', (
        request, response
    ) => {
        response.send({ message: 'Server is running...' });
    }
);
// default server configs
SERVER_DEFAULT_CONFIG = {
    port: 4000,
    controllers: [
        // todo: create default controller
    ],
    inConjunctionRunHttps: false,
};

/**
 * setup module for export */
// declare module exports
exports = {
    use: (configs = [SERVER_DEFAULT_CONFIG]) => {
        configs.forEach(
            serverConfig =>
                startupServer(serverConfig.port, serverConfig.controllers, serverConfig.inConjunctionRunHttps)
        );
    }
};
// assign module exports
module.exports = exports;
