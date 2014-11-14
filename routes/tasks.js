'use strict';

// Tasks routes
var TasksController = require('../controllers/Tasks');

exports.register = function(plugin, options, next) {
    // Setup the controller
    var tasksController = new TasksController(options.database);

    // Binds all methods
    plugin.bind(tasksController);

    plugin.route([
        {
            method: 'GET',
            path: '/tasks',
            handler: tasksController.index
        }
    ]);

    next();
}

exports.register.attributes = {
    name: 'tasks-route',
    version: '0.0.0'
};
