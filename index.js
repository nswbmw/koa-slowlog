'use strict';

let pkg = require('pkg-up').sync();

module.exports = function (options) {
  options = options || {};
  options.name = options.name || (require(pkg) || {}).name;
  options.input = options.output = options.fn = options.filename = undefined;

  let _slowlog = require('co-slowlog')(options);

  return function* slowlog(next) {
    yield _slowlog(function* () {
      yield next;
    }, {
      method: this.method,
      url: this.url,
      ips: this.ips,
      headers: this.request.headers,
      body: this.request.body
    });
  };
};