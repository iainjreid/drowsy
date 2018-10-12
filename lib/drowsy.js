"use strict";

const { URL } = require("url");

function drowsy(...args) {
  return new Proxy(args.reverse(), {
    apply: ([action, url, handler], _, args) => {
      switch (typeof action) {
        case "string":
        case "number":
          return handleRequest(action, url, handler, ...args);

        default:
          throw Error("No action set");
      }
    },

    get: ([action, url, handler], prop) => {
      switch (typeof prop) {
        case "string":
        case "number":
          return handleLookup(action, url, handler, prop);

        default:
          throw Error("Lookup must be a string or a number");
      }
    }
  });
}

function handleRequest(action, url, handler, ...args) {
  if (!handler[action]) {
    throw Error(`Action "${action}" is not defined`);
  } else {
    return handler[action](url, ...args);
  }
}

function handleLookup(action, url, handler, lookup) {
  lookup = lookup.split(/(?=[A-Z])/).map(_ => _.toLowerCase());

  if (!action) {
    action = lookup.shift();
  }

  return drowsy(handler, new URL(lookup.join("/"), url), action);
}

module.exports = Object.assign(drowsy, { handleRequest, handleLookup });
