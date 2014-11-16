'use strict';

var Boom = require('boom');
var TasksModel = require('../models/Tasks');

function TasksController(database) {
    this.tasksModel = new TasksModel(database);
};

TasksController.prototype.index = function(request, reply) {
    var start = request.query.start;
    var limit = request.query.limit;

    if (start == null) {
        start = 0
    }

    if (limit == null) {
        limit = start + 9
    }

    reply(this.tasksModel.getTasks(start, limit));
};

TasksController.prototype.store = function(request, reply) {
    try {
        reply(this.tasksModel.addTask(request.payload.task))
            .created();
    } catch (e) {
        reply(Boom.badRequest(e.message));
    }
};

TasksController.prototype.update = function(request, reply) {
    try {
        var id = request.params.id;
        var task = request.payload.task;

        reply(this.tasksModel.updateTask(id, task));
    } catch (e) {
        reply(Boom.notFound(e.message));
    }
};

TasksController.prototype.destroy = function(request, reply) {
    try {
        var id = request.params.id;
        this.tasksModel.deleteTask(id)
        reply().code(204);
    } catch (e) {
        reply(Boom.notFound(e.message));
    }
};

module.exports = TasksController;
