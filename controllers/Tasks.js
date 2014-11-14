'use strict';

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
        limit = 10
    };

    reply(this.tasksModel.getTasks(start, limit));
};

module.exports = TasksController;
