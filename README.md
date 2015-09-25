## koa-slowlog

slowlog for koa, based on [co-slowlog](https://github.com/nswbmw/co-slowlog).

### Install

```
npm i koa-slowlog --save
```

### Usage

```
var slowlog = require('koa-slowlog');
app.use(slowlog());
```

**slowlog([options])**

options see [co-slowlog](https://github.com/nswbmw/co-slowlog).

### Example

```
'use strict';
 
var app = require('koa')();
var wait = require('co-wait');
var bodyparser = require('koa-bodyparser');
var slowlog = require('./');
 
app.use(bodyparser());
app.use(slowlog({
  slow: 500
}));
app.use(function* () {
  yield wait(1000);
});
 
app.listen(3000, function () {
  console.log('listening on 3000.');
});
```

use curl:

```
curl -XPOST -d'{"name":"nswbmw"}' -H 'Content-Type: Application/json' 'localhost:3000/user/setting?admin=true'
```

output:

```
{
    "slow": 500,
    "name": "koa-slowlog",
    "hostname": "nswbmw.local",
    "pid": 57314,
    "level": 30,
    "method": "POST",
    "url": "/user/setting?admin=true",
    "ips": [],
    "headers": {
        "host": "localhost:3000",
        "user-agent": "curl/7.43.0",
        "accept": "*/*",
        "content-type": "Application/json",
        "content-length": "17"
    },
    "body": {
        "name": "nswbmw"
    },
    "msg": "1005ms",
    "time": "2015-09-25T07:18:19.317Z",
    "v": 0
}
```

### License

MIT