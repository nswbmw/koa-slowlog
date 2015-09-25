'use strict';

let merge = require('merge-descriptors');
let slowlog = require('co-slowlog')();
let pkg = require('pkg-up').sync();

module.exports = function (options) {
  options = options || {};
  options.name = options.name || (require(pkg) || {}).name;
  options.input = options.output = options.fn = options.filename = undefined;

  return function* (next) {
    yield slowlog(function* () {
      yield next;
    }, merge({
      method: this.method,
      url: this.url,
      ips: this.ips,
      headers: this.request.headers,
      body: this.request.body
    }, options));
  };
};