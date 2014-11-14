'use strict';

function TasksController() {};

TasksController.prototype.index = function(request, reply) {
    reply('Hello world');
};

module.exports = TasksController;
