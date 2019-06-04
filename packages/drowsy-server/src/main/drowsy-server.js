"use strict";

const http = require('http');

const methodRefs = {};

for (const method of ["GET", "POST", "PUT", "PATCH", "DELETE"]) {
  methodRefs[method] = Symbol(`${method} Method Reference`);
}

const handlerRef = Symbol('Handler Reference');

module.exports = () => {
  const routes = {};
  const methods = {};
  const middlewares = [];

  let server = http.createServer(async (req, res) => {
    const urlParts = req.url.split(/\//).filter(_ => _).map(_ => _.toLowerCase());

    let handlerLookup = routes;

    for (let i = 0, n = urlParts.length; i < n; i++) {
      handlerLookup = handlerLookup[urlParts[i]];

      if (!handlerLookup) {
        break;
      }
    }

    if (handlerLookup && handlerLookup[handlerRef] && handlerLookup[handlerRef][methodRefs[req.method]]) {
      for (let i = 0, n = middlewares.length; i < n; i++) {
        middlewares[i](req, res);
      }

      return handlerLookup[handlerRef][methodRefs[req.method]](req, res);
    } else {
      res.end("Not found");
    }
  });

  for (const method in methodRefs) {
    methods[method.toLowerCase()] = (url, handler) => {
      const urlParts = url.split(/\//).filter(_ => _).map(_ => _.toLowerCase());

      let handlerLookup = routes;

      for (let i = 0, n = urlParts.length; i < n; i++) {
        handlerLookup = handlerLookup[urlParts[i]] || (handlerLookup[urlParts[i]] = {});
      }

      handlerLookup[handlerRef] = handlerLookup[handlerRef] || {};
      handlerLookup[handlerRef][methodRefs[method]] = handler;
    };
  }

  methods.use = (middleware) => {
    if (typeof middleware === "function") {
      middlewares.push(middleware);
    } else {
      throw Error("Invalid middleware");
    }
  }

  return Object.assign(server, methods);
};
