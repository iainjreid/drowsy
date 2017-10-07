"use strict";

// Dependencies
const url = require('url')
const handler = require('./handler')

module.exports = (href = 'http://localhost', ...args) => {
  // Parse the URL
  const { protocol, hostname, pathname } = url.parse(href);

  return new Proxy(handler.setup(...args), {
    get: (obj, prop) => {
      if (typeof prop !== "string") {
        return obj;
      }

      // Split the property by its capital letters if available
      const [method, ...path] = prop.split(/(?=[A-Z])/).map(x => x.toLowerCase());

      if (!obj.hasOwnProperty(method)) {
        throw Error(`Unhandled method "${method}", please use a supported HTTP verb`);
      }

      return trapHandler(obj[method], protocol, hostname, [...normalisePath(pathname), ...path]);
    }
  });
};

function trapHandler(handlerMethod, protocol, hostname, path = []) {
  return new Proxy((...args) => handlerMethod({ protocol, hostname, path }, ...args), {
    get: (obj, prop) => trapHandler(handlerMethod, protocol, hostname, [...path, prop])
  });
}

function normalisePath(pathname) {
  return pathname.split("/").filter(str => str.length);
}
