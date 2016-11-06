'use strict'

// Dependencies
const url = require('url')
const handlers = require('./handlers')

module.exports = (href = 'http://localhost', handler = 'default') => {
  // Ensure that the HREF is a string
  if (typeof href !== 'string') {
    throw Error('The href must be a string')
  }

  // Parse the URL
  const { hostname, path: prefix } = url.parse(href)

  return new Proxy(handlers[handler], {
    get: (obj, prop) => {
      // Split the property by its capital letters if available
      const [method, ...path] = prop.split(/(?=[A-Z])/)

      if (!obj.hasOwnProperty(method)) {
        throw Error(`Unknown method "${method}", please use a supported HTTP verb`)
      }

      if (!path.length) {
        return trap(obj[method], hostname, path)
      }

      return (...args) => obj[method]({ hostname, path: [prefix, ...path] }, ...args)
    }
  })
}

function trap (handler, hostname, path = []) {
  return new Proxy((...args) => handler({ hostname, path }, ...args), {
    get: (obj, prop) => trap(handler, hostname, [...path, prop])
  })
}
