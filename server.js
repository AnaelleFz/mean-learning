'use strict';
const express = require('express');

/**
 * Services
 */
const commandLineUtils = require('./utils/commandLineUtils.js');

/**
 * Routes
 */
const bookmarkSearchRoute = require('./modules/bookmark');
const AlphaVantageRoute = require('./modules/alphaVantage');
const errorHandlerRoute = require('./modules/error');

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Vary", "Origin");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS, DELETE");
    res.header("Content-Type", "text/json")
    next();
    // if('OPTIONS' == req.method) {
    //     res.sendStatus(200);
    // } else {
    //     next();
    // }
});

app.use(bookmarkSearchRoute);
app.use(AlphaVantageRoute);
// app.use(errorHandlerRoute);

/**
 * Lancement du serveur
 */
if(commandLineUtils.getCommandLineOptions().launchServer === 'Y') {
    var server = app.listen(3000, function() {
        var port = server.address().port;
        console.log(new Date());
        console.log('Express server listening on port %s.', port);
    });
}

