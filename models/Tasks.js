'use strict';

var crypto = require('crypto');

function TasksModel(database) {
    this.db = database;
};

TasksModel.prototype.getTasks = function(start, limit) {
    var tasks = this.getAllTasks();
    return tasks.slice(start, limit + 1);
};

TasksModel.prototype.getAllTasks = function() {
    return this.db.get('tasks') || [];
};

TasksModel.prototype.findTaskByProperty = function(prop, value) {
    var task, i, len;
    var tasks = this.getAllTasks();

    for (i = 0, len = tasks.length; i < len; i++) {
        task = tasks[i];
        if (task[prop] === value) {
            return task;
        }
    }

    return null;
};

TasksModel.prototype.addTask = function(newTask) {
    var tasks = this.getAllTasks();
    newTask = newTask.trim();

    // We don't want duplicates
    if (this.findTaskByProperty('value', newTask)) {
        throw new Error('Task already exists for id: ' + task.id);
    }

    var task = {
        // Collisions can happen but unlikely
        // 1 byte to hex turns into two characters
        id: crypto.randomBytes(8).toString('hex'),
        value: newTask
    }
    tasks.push(task);

    this.db.set('tasks', tasks);

    return task;
};

TasksModel.prototype.updateTask = function(id, updatedTask) {
    var tasks = this.getAllTasks();
    updatedTask = updatedTask.trim();

    var task = this.findTaskByProperty('id', id);

    if (!task) {
        throw new Error('Task doesn\'t exists.');
    }

    task.value = updatedTask;

    return task;
};

module.exports = TasksModel;
