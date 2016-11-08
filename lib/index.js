'use strict'

// Dependencies
const url = require('url')
const handlers = require('./handlers')

module.exports = (href = 'http://localhost', handler = 'default') => {
  // Parse the URL
  const { protocol, hostname, pathname } = url.parse(href)

  return new Proxy(handlers[handler], {
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
        return trap(obj[method], protocol, hostname, [pathname, ...path])
      }

      return (...args) => obj[method]({ protocol, hostname, path: [pathname, ...path] }, ...args)
    }
  })
}

function trap (handler, protocol, hostname, path = []) {
  return new Proxy((...args) => handler({ protocol, hostname, path }, ...args), {
    get: (obj, prop) => trap(handler, protocol, hostname, [...path, prop])
  })
}
