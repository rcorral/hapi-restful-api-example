'use strict';

// Tasks routes
var Joi = require('joi');
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
            config: {
                handler: tasksController.index,
                validate: {
                    query: Joi.object().keys({
                        start: Joi.number().min(0),
                        limit: Joi.number().min(1)
                    })
                }
            }
        },
        {
            method: 'POST',
            path: '/tasks',
            config: {
                handler: tasksController.store,
                validate: {
                    payload: Joi.object().length(1).keys({
                        task: Joi.string().required().min(1).max(30)
                    })
                }
            }
        }
    ]);

    next();
}

exports.register.attributes = {
    name: 'tasks-route',
    version: '0.0.0'
};
