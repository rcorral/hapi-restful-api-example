A Tasks API built using hapi
============================

[![Build Status](http://img.shields.io/travis/rcorral/hapi-restful-api-example.svg?style=flat)](https://travis-ci.org/rcorral/hapi-restful-api-example)
[![dependency Status](https://david-dm.org/rcorral/hapi-restful-api-example.svg?style=flat)](https://david-dm.org/rcorral/hapi-restful-api-example#info=dependencies)
[![devDependency Status](https://david-dm.org/rcorral/hapi-restful-api-example/dev-status.svg?style=flat)](https://david-dm.org/rcorral/hapi-restful-api-example#info=devDependencies)

An example of a Restful API built using [hapi.js](http://hapijs.com/) for storing a list of tasks.

Install
-------

`$ git clone git@github.com:rcorral/hapi-restful-api-example.git`  
`$ cd hapi-restful-api-example`  
`$ npm install`

Run
---

`$ npm index.js`

Using the API
-------------

#### Get tasks
`$ curl -XGET http://localhost:8000/tasks`

#### Get task by id
`$ curl -XGET http://localhost:8000/tasks/{id}`

#### Add tasks

```
$ curl -XPOST http://localhost:8000/tasks \
       -H 'Content-Type: application/json' \
       -d '{"task": "Play futbol."}'
```

#### Update task

```
$ curl -XPUT http://localhost:8000/tasks/{id} \
        -H 'Content-Type: application/json' \
        -d '{"task": "Play soccer."}'
```

#### Delete task
`$ curl -XDELETE http://localhost:8000/tasks/{id}`

Tests
-----

`$ npm test`

License
-------

MIT
