'use strict';

var lab = exports.lab = require('lab').script();
var describe = lab.describe;
var it = lab.it;
var beforeEach = lab.beforeEach;
var afterEach = lab.afterEach;
var server = require('../../');
var db = server.database;

describe('Routes /tasks', function() {

    describe('GET', function() {

        beforeEach(function(done) {
            db.clear();
            var options = {method: 'POST', url: '/tasks', payload: {}};

            for (var i = 0; i < 20; i++) {
                options.payload.task = 'task#' + i;
                server.inject(options, function(response) {
                    if (response.result.value === 'task#19') {
                        done();
                    }
                });
            }
        });

        it('returns 200 HTTP status code', function(done) {
            var options = {method: 'GET', url: '/tasks'};
            server.inject(options, function(response) {
                response.statusCode.should.be.exactly(200);
                done();
            });
        });

        it('returns an empty array when db is empty', function(done) {
            db.clear();
            var options = {method: 'GET', url: '/tasks'};
            server.inject(options, function(response) {
                response.result.should.be.an.instanceOf.Array;
                response.result.should.eql([]);
                done();
            });
        });

        it('returns 10 tasks at a time by default', function(done) {
            var options = {method: 'GET', url: '/tasks'};
            server.inject(options, function(response) {
                response.result.length.should.be.exactly(10);
                done();
            });
        });

        it('returns 10 tasks at a time if the limit query parameter isn\'t used', function(done) {
            var options = {method: 'GET', url: '/tasks?start=2'};
            server.inject(options, function(response) {
                response.result.length.should.be.exactly(10);
                done();
            });
        });

        it('returns objects for each item in results', function(done) {
            var options = {method: 'GET', url: '/tasks'};
            server.inject(options, function(response) {
                for (var i = 0; i < response.result.length; i++) {
                    response.result[i].should.be.an.instanceOf.Object;
                };
                done();
            });
        });

        it('returns objects that have an id and a value property', function(done) {
            var options = {method: 'GET', url: '/tasks'};
            server.inject(options, function(response) {
                for (var i = 0; i < response.result.length; i++) {
                    response.result[i].should.have.property('id');
                    response.result[i].should.have.property('value');
                };
                done();
            });
        });

        it('shouldn\'t allow a start query parameter smaller than 0', function(done) {
            var options = {method: 'GET', url: '/tasks?start=-1'};
            server.inject(options, function(response) {
                response.statusCode.should.be.exactly(400);
                response.result.should.be.an.instanceOf.Object;
                done();
            });
        });

        it('shouldn\'t allow a limit query parameter smaller than 1', function(done) {
            var options = {method: 'GET', url: '/tasks?limit=0'};
            server.inject(options, function(response) {
                response.statusCode.should.be.exactly(400);
                response.result.should.be.an.instanceOf.Object;
                done();
            });
        });

        it('returns the right amount of results given the query', function(done) {
            var options = {method: 'GET', url: '/tasks?start=6&limit=10'};
            server.inject(options, function(response) {
                response.result.length.should.be.exactly(5);
                done();
            });
        });

        it('returns results within the correct limits', function(done) {
            var options = {method: 'GET', url: '/tasks'};
            // Get first 10 objects
            server.inject(options, function(response) {
                var tasks = response.result;
                var options = {method: 'GET', url: '/tasks?start=2&limit=4'};
                server.inject(options, function(response) {
                    response.result.length.should.be.exactly(3);
                    response.result[0].should.eql(tasks[2]);
                    response.result[1].should.eql(tasks[3]);
                    response.result[2].should.eql(tasks[4]);
                    done();
                });
            });
        });

    });

    describe('POST', function() {

        var clear = function(done) {
            db.clear();
            done();
        };
        beforeEach(clear);
        afterEach(clear);

        it('fails when there\'s no payload', function(done) {
            var options = {method: 'POST', url: '/tasks'};
            server.inject(options, function(response) {
                response.statusCode.should.be.exactly(400);
                done();
            });
        });

        it('fails with an invalid payload', function(done) {
            var options = {method: 'POST', url: '/tasks', payload: {}};
            server.inject(options, function(response) {
                response.statusCode.should.be.exactly(400);
                done();
            });
        });

        it('fails when there\'s too many properties in the payload', function(done) {
            var options = {method: 'POST', url: '/tasks', payload: {task: 'a task', something: 'else'}};
            server.inject(options, function(response) {
                response.statusCode.should.be.exactly(400);
                done();
            });
        });

        it('fails when the task value is empty', function(done) {
            var options = {method: 'POST', url: '/tasks', payload: {task: ''}};
            server.inject(options, function(response) {
                response.statusCode.should.be.exactly(400);
                done();
            });
        });

        it('fails when the task property is not set in payload', function(done) {
            var options = {method: 'POST', url: '/tasks', payload: {something: 'else'}};
            server.inject(options, function(response) {
                response.statusCode.should.be.exactly(400);
                done();
            });
        });

        it('fails whenthe task value is too long', function(done) {
            var task = 'this is longer than 60 characters. aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
            var options = {method: 'POST', url: '/tasks', payload: {task: task}};
            server.inject(options, function(response) {
                response.statusCode.should.be.exactly(400);
                done();
            });
        });

        it('returns 201 HTTP status code', function(done) {
            var options = {method: 'POST', url: '/tasks', payload: {task: 'my task'}};
            server.inject(options, function(response) {
                response.statusCode.should.be.exactly(201);
                done();
            });
        });

        it('returns an object after creating new task', function(done) {
            var options = {method: 'POST', url: '/tasks', payload: {task: 'my task'}};
            server.inject(options, function(response) {
                response.result.should.be.an.instanceOf.Object;
                done();
            });
        });

        it('returns an object with id and value properties', function(done) {
            var options = {method: 'POST', url: '/tasks', payload: {task: 'my task'}};
            server.inject(options, function(response) {
                response.result.should.have.property('id');
                response.result.should.have.property('value');
                response.result.value.should.be.exactly('my task');
                done();
            });
        });

        it('ids are 16 characters long', function(done) {
            var options = {method: 'POST', url: '/tasks', payload: {task: 'my task'}};
            server.inject(options, function(response) {
                response.result.id.length.should.be.exactly(16);
                done();
            });
        });

        it('ids should be hex values', function(done) {
            var options = {method: 'POST', url: '/tasks', payload: {task: 'my task'}};
            server.inject(options, function(response) {
                /[ABCDEF0-9]{16}/i.test(response.result.id).should.be.ok;
                done();
            });
        });

        it('trims white space', function(done) {
            var options = {method: 'POST', url: '/tasks', payload: {task: '   my task           '}};
            server.inject(options, function(response) {
                response.result.value.should.be.exactly('my task');
                done();
            });
        });

        it('doesn\'t allow duplicate tasks', function(done) {
            var options = {method: 'POST', url: '/tasks', payload: {task: 'task1'}};
            server.inject(options, function(response) {
                server.inject(options, function(response) {
                    response.result.statusCode.should.be.exactly(400);
                    done();
                });
            });
        });

        it('saves added task', function(done) {
            var options = {method: 'POST', url: '/tasks', payload: {task: 'my task'}};
            server.inject(options, function(response) {
                var options = {method: 'GET', url: '/tasks'};
                server.inject(options, function(response) {
                    response.result[0].value.should.be.eql('my task');
                    done();
                });
            });
        });

    });

});
