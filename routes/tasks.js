'use strict';

exports.register = function(plugin, options, next) {
    plugin.route([
        {
            method: 'GET',
            path: '/tasks',
            handler: function (request, reply) {
                reply('hello world');
            }
        }
    ]);

    next();
}

exports.register.attributes = {
    name: 'tasks-route',
    version: '0.0.0'
};
