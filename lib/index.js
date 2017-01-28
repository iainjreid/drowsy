'use strict'

// Dependencies
const url = require('url')
const handlers = require('./handlers')

module.exports = (href = 'http://localhost', handler = 'request', ...args) => {
  // Parse the URL
  const { protocol, hostname, pathname } = url.parse(href)

  // Ensure that the handler exists
  if (!handlers.hasOwnProperty(handler)) {
    throw Error(`Unknown handler "${handler}", please use a supported handler`);
  }

  return new Proxy(handlers[handler].setup(...args), {
    get: (obj, prop) => {
      if (typeof prop !== 'string') {
        return obj
      }

      // Split the property by its capital letters if available
      const [method, ...path] = prop.split(/(?=[A-Z])/).map(x => x.toLowerCase())

      if (!obj.hasOwnProperty(method)) {
        throw Error(`Unhandled method "${method}", please use a supported HTTP verb`)
      }

      if (!path.length) {
        return trapHandler(obj[method], protocol, hostname, normalisePath(pathname))
      }

      return (...args) => obj[method]({ protocol, hostname, path: [...normalisePath(pathname), ...path] }, ...args)
    }
  })
}

function trapHandler(handlerMethod, protocol, hostname, path = []) {
  return new Proxy((...args) => handlerMethod({ protocol, hostname, path }, ...args), {
    get: (obj, prop) => trapHandler(handlerMethod, protocol, hostname, [...path, prop])
  })
}

function normalisePath(pathname) {
  return pathname.split('/').filter(str => str.length);
}
