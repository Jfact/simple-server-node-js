const express = require('express');
const router  = express.Router();
const PATH = require('path');

const CONTROLLER_NAME = PATH.basename(__filename).split('.controller.js')[0];
const REQUEST_URLS = {
    index: `${CONTROLLER_NAME}`,
    new: 'new',
    build: 'build',
    serve: 'serve'
}

function responseFor(method, path) {
    return {
        method,
        message: 'Ok, known controller path : ' + path
    };
}

router.post(
    `/${REQUEST_URLS.index}`,
    (
        request,
        response,
        next
    ) => {
        response.send(responseFor('post', '/ng'));
    }
);

router.post(
    `/${REQUEST_URLS.index}`,
    (
        request,
        response,
        next
    ) => {
        response.send(responseFor('post', '/ng'));
    }
);

module.exports = router;
