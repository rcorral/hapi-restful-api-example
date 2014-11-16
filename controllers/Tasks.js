'use strict';

var Boom = require('boom');
var TasksModel = require('../models/Tasks');

function TasksController(database) {
    this.tasksModel = new TasksModel(database);
};

// [GET] /tasks
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

// [GET] /tasks/{id}
TasksController.prototype.show = function(request, reply) {
    try {
        var id = request.params.id;

        reply(this.tasksModel.getTask(id));
    } catch (e) {
        reply(Boom.notFound(e.message));
    }
};

// [POST] /tasks
TasksController.prototype.store = function(request, reply) {
    try {
        var value = request.payload.task;

        reply(this.tasksModel.addTask(value))
            .created();
    } catch (e) {
        reply(Boom.badRequest(e.message));
    }
};

// [PUT] /tasks/{id}
TasksController.prototype.update = function(request, reply) {
    try {
        var id = request.params.id;
        var task = request.payload.task;

        reply(this.tasksModel.updateTask(id, task));
    } catch (e) {
        reply(Boom.notFound(e.message));
    }
};

// [DELETE] /tasks/{id}
TasksController.prototype.destroy = function(request, reply) {
    try {
        var id = request.params.id;

        this.tasksModel.deleteTask(id);
        reply().code(204);
    } catch (e) {
        reply(Boom.notFound(e.message));
    }
};

module.exports = TasksController;
