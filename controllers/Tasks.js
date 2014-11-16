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
    };

    if (limit == null) {
        limit = start + 9
    };

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

module.exports = TasksController;
