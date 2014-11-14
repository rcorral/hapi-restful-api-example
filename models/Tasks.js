'use strict';

function TasksModel(database) {
    this.db = database;
};

TasksModel.prototype.getTasks = function(start, limit) {
    return this.db.get('tasks') || [];
};

module.exports = TasksModel;
