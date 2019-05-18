"use strict";

const http = require("http");

const handlerRef = Symbol('Handler Reference');

module.exports = () => {
  const routes = {};

  return {
    get(url, handler) {
      const urlParts = url.split(/\//).filter(_ => _).map(_ => _.toLowerCase());

      let handlerLookup = routes;

      for (let i = 0, n = urlParts.length; i < n; i++) {
        handlerLookup[urlParts[i]] = handlerLookup = {};
      }

      handlerLookup[handlerRef] = handler;
    },

    listen(_, port, cb) {
      const server = http.createServer();

      server.on("request", async (req, res) => {
        const urlParts = req.url.split(/\//).filter(_ => _).map(_ => _.toLowerCase());

        let handlerLookup = routes;

        for (let i = 0, n = urlParts.length; i < n; i++) {
          handlerLookup = routes[urlParts[i]];

          if (!handlerLookup) {
            return;
          }
        }

        handlerLookup[handlerRef] && handlerLookup[handlerRef](req, res);
      });

      server.listen(port, "localhost", cb && (() => cb(server)));
    },
  };
};
