/**
 * Define server ports configs
 *
 * Do not end ports with 443
 * Ports with ending *443 is used for HTTPS
 * Examples
 *
 * def - > http://localhost:8001 for the https will be converted
 *      -> https://localhost:8443
 *
 * Or
 *
 * def - > http://localhost:4202 for the https will be converted
 *      -> https://localhost:4443
 * */
const SERVER = require('./lib/server');

SERVER.use([
    {
        port: 4000,
        controllers: [
            require('./controllers/ng.controller'),
            require('./controllers/ide.controller')
        ],
        inConjunctionRunHttps: true,
    }
]);

