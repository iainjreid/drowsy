"use strict";

function drowsy(handler, url, action) {
  return new Proxy(() => undefined, {
    apply: (obj, scope, args) => {
      switch (typeof action) {
        case "string":
        case "number":
          return handleRequest(handler, url, action, ...args);

        default:
          throw Error(`Unusable action "${action}"`);
      }
    },

    get: (obj, prop) => {
      switch (typeof prop) {
        case "string":
        case "number":
          return handleLookup(handler, url, action, prop);
      }
    }
  });
}

function handleRequest(handler, url, action, ...args) {
  if (!handler[action]) {
    throw Error(`Action "${action}" is not defined`);
  } else {
    return handler[action](url, ...args);
  }
}

function handleLookup(handler, url, action, lookup) {
  lookup = lookup.split(/(?=[A-Z])/).map(_ => _.toLowerCase());

  if (!action && handler[lookup[0]]) {
    action = lookup.shift();
  }

  return drowsy(handler, [url, ...lookup].join("/"), action);
}

module.exports = Object.assign(drowsy, { handleRequest, handleLookup });
