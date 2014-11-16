'use strict';

var crypto = require('crypto');

function TasksModel(database) {
    this.db = database;
};

TasksModel.prototype.getTasks = function(start, limit) {
    var tasks = this.getAllTasks();
    return tasks.slice(start, limit + 1);
};

TasksModel.prototype.getAllTasks = function(start, limit) {
    return this.db.get('tasks') || [];
};

TasksModel.prototype.addTask = function(newTask) {
    var task, i, len;
    var tasks = this.getAllTasks();
    newTask = newTask.trim();

    // Check if task already exists
    for (i = 0, len = tasks.length; i < len; i++) {
        task = tasks[i];
        if (task.value === newTask) {
            throw new Error('Task already exists for id: ' + task.id);
        }
    }

    task = {
        // Collisions can happen but unlikely
        id: crypto.randomBytes(8).toString('hex'),
        value: newTask
    };
    tasks.push(task);

    this.db.set('tasks', tasks);

    return task;
};

module.exports = TasksModel;
