'use strict';

var Database = require('./database');
var Good = require('good');
var Hapi = require('hapi');

var database = new Database();
var server = new Hapi.Server('localhost', 8000);

var plugins = [
    {
        plugin: Good,
        options: {
            reporters: [{
                reporter: require('good-console'),
                args:[{log: '*', request: '*', error: '*'}]
            }]
        }
    },
    {
        plugin: require('./routes/tasks.js'),
        options: {
            database: database
        }
    }
];

server.pack.register(plugins, function (err) {
    if (err) { throw err; }

    server.start(function () {
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});
