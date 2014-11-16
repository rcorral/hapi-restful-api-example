'use strict';

var Database = require('./database');
var Good = require('good');
var Hapi = require('hapi');

var database = new Database();
var server = new Hapi.Server('localhost', 8000);
var plugins = [];

// Expose database
if (process.env.NODE_ENV === 'test') {
    server.database = database;
}

// Avoids logs to console when running tests
if (process.env.NODE_ENV !== 'test') {
    plugins.push({
        plugin: Good,
        options: {
            reporters: [{
                reporter: require('good-console'),
                args:[{log: '*', request: '*', error: '*'}]
            }]
        }
    });
}

// Add routes
plugins.push({
    plugin: require('./routes/tasks.js'),
    options: {
        database: database
    }
});

server.pack.register(plugins, function (err) {
    if (err) { throw err; }

    if (!module.parent) {
        server.start(function () {
            server.log('info', 'Server running at: ' + server.info.uri);
        });
    }
});

module.exports = server;
