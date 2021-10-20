const express = require('express');
const router  = express.Router();

const path = require('path');
const rootUrl = path.basename(__filename);

const ROOT_URL = path.basename(__filename);
const CHILDREN_URLS = {
    index: '',
    new: 'new',
    build: 'build',
    serve: 'serve'
}
const PATH = require('path');
const ROUTES = [
    {
        path: CHILDREN_URLS.index,
        method: 'post',
    },
    {
        path: CHILDREN_URLS.index,
        method: 'get',
    }
];

ROUTES.forEach(route => {
    const path = ROOT_URL + (
        route.path && route.path !== ''
            ? '/'
            : ''
    ) + route.path;

    router[route.method](
        path,
        (response, request, next) =>
            handleRequest(response, request, next, route.path)
    );
});

function handleRequest(
    response,
    request,
    next,
    routePath = undefined
) {
    const requestRoute = ROUTES.find(route => route.path === routePath);

    switch (requestRoute) {
        case CHILDREN_URLS.index:
            response.send({message: 'Ok, known controller path : ' + routePath});
            break;
        case CHILDREN_URLS.new:
            response.send({message: 'Ok, known controller path : ' + routePath});
            break;
        case CHILDREN_URLS.serve:
            response.send({message: 'Ok, known controller path : ' + routePath});
            break;
        default:
            response.send({message: 'Error, unknown controller path : ' + routePath});
            break;
    }
}

module.exports = router;

//
// /**
//  * @path: ng
//  * */
//
// router.post(
//     rootUrl,
//     (request, response, next) =>
//         handleRequest()
// );
//
// router.post(
//     `${rootUrl}`,
//     (
//         request,
//         response,
//         next
//     ) => {
//
//         // const t = await exe.ng();
//         //
//         // console.log(t);
//
//         // response.send({message: 'Ok'});
//
//         const s = require('../../app/start');
//
//         response.send({message: 'Wait'});
//     }
// );
//
// /**
//  * test
//  * */
// router.post(
//     `${rootUrl}/t`,
//     async (
//         request,
//         response,
//         next
//     ) => {
//         response.send({message: 't'});
//     }
// );
//
// /**
//  * Create new angular app
//  * */
// router.post(
//     `${rootUrl}/new`,
//     async (
//         request,
//         response,
//         next
//     ) => {
//
//         const t = await exe.ngNewApp({t: ''})
//             .then(() => {
//                 return response.send({message: 'Ok'});
//             });
//     }
// );
//
// /**
//  * Serve angular app
//  * */
// router.post(
//     `${rootUrl}/serve`,
//     async (
//         request,
//         response,
//         next
//     ) => {
//
//         const t = await exe.ngServeApp({t: ''})
//             .then(() => {
//                 return response.send({message: 'Ok'});
//             });
//     }
// );

// module.exports = router;
