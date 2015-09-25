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