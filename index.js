'use strict';

var Database = require('./database');
var Hapi = require('hapi');

var database = new Database();
var server = new Hapi.Server({debug: {request: ['info', 'error']}});

// Expose database
if (process.env.NODE_ENV === 'test') {
    server.database = database;
}

// Create server
server.connection({
    host: '0.0.0.0',
    port: process.env.PORT || 8000
});

// Add routes
var plugins = [
    {
        register: require('./routes/tasks.js'),
        options: {
            database: database
        }
    }
];

server.register(plugins, function (err) {
    if (err) { throw err; }

    if (!module.parent) {
        server.start(function(err) {
            if (err) { throw err; }

            // Load some data
            var datas = [
                'Learn to say the alphabet backwards.',
                'Program repetitive tasks.',
                'Write a tetris clone.',
                'Play with cat before bed time.'
            ];
            for (var i = 0; i < datas.length; i++) {
                server.inject({method: 'POST', url: '/tasks', payload: {task: datas[i]}}, function(){});
            };

            server.log('info', 'Server running at: ' + server.info.uri);
        });
    }
});

module.exports = server;
