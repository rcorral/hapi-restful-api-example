DEMO
====

An example of a Restful API built using [hapi.js](http://hapijs.com/) v8.0.  
See the [master](https://github.com/rcorral/hapi-restful-api-example) branch for more info.

Using the demo
--------------

Demo url: [https://hapi-restful-api-example.herokuapp.com/tasks](https://hapi-restful-api-example.herokuapp.com/tasks)  
See below for the different requests you can play with.

#### Get tasks
```
$ curl -XGET https://hapi-restful-api-example.herokuapp.com/tasks
```

#### Get task by id
```
$ curl -XGET https://hapi-restful-api-example.herokuapp.com/tasks/{id}
```

#### Add tasks

```
$ curl -XPOST https://hapi-restful-api-example.herokuapp.com/tasks \
       -H 'Content-Type: application/json' \
       -d '{"task": "Play futbol."}'
```

#### Update task

```
$ curl -XPUT https://hapi-restful-api-example.herokuapp.com/tasks/{id} \
        -H 'Content-Type: application/json' \
        -d '{"task": "Play soccer."}'
```

#### Delete task
```
$ curl -XDELETE https://hapi-restful-api-example.herokuapp.com/tasks/{id}
```

License
-------

MIT
