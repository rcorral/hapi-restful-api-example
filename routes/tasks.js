'use strict';

// Tasks routes
var Joi = require('joi');
var TasksController = require('../controllers/Tasks');

exports.register = function(plugin, options, next) {
    // Setup the controller
    var tasksController = new TasksController(options.database);

    // Binds all methods
    // Similar to doing `tasksController.index.bind(tasksController);`
    // When declaring handlers
    plugin.bind(tasksController);

    // Declare routes
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
            method: 'GET',
            path: '/tasks/{id}',
            config: {
                handler: tasksController.show,
                validate: {
                    params: {
                        id: Joi.string().regex(/[a-zA-Z0-9]{16}/)
                    }
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
                        task: Joi.string().required().min(1).max(60)
                    })
                }
            }
        },
        {
            method: 'PUT',
            path: '/tasks/{id}',
            config: {
                handler: tasksController.update,
                validate: {
                    params: {
                        id: Joi.string().regex(/[a-zA-Z0-9]{16}/)
                    },
                    payload: Joi.object().length(1).keys({
                        task: Joi.string().required().min(1).max(60)
                    })
                }
            }
        },
        {
            method: 'DELETE',
            path: '/tasks/{id}',
            config: {
                handler: tasksController.destroy,
                validate: {
                    params: {
                        id: Joi.string().regex(/[a-zA-Z0-9]{16}/)
                    }
                }
            }
        }
    ]);

    next();
}

exports.register.attributes = {
    name: 'tasks-route',
    version: '1.0.0'
};
