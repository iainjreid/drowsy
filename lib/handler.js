"use strict";

// Dependencies
const url = require("url");
const needle = require("needle");

exports.setup = (defaults = {}) => {
  // Setup a curried call method
  const call = method => {
    return ({ protocol, hostname, path }, data, opts) => {
      const uri = url.format({ protocol, hostname, pathname: path.join("/") });

      return new Promise((resolve, reject) => {
        return needle.request(method, uri, data, defaults || opts, (err, res) => {
          return err ? reject(err) : resolve(res);
        });
      });
    };
  };

  return {
    get: call("get"),
    head: call("head"),
    post: call("post"),
    put: call("put"),
    patch: call("patch"),
    del: call("del"),
    delete: call("delete")
  };
};
