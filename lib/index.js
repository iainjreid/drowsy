'use strict'

// Dependencies
const http = require('http')
const https = require('https')

module.exports = class Drowsy {
  constructor (url = 'http://localhost') {
    [this.protocol, this.hostname] = url.split('://')

    // Ensure that the Hostname is a string
    if (typeof this.hostname !== 'string') {
      throw Error('The hostname must be a string')
    }

    // Ensure that a valid protocol has been supplied
    if (this.protocol === 'http') {
      this.handler = http
    } else if (this.protocol === 'https') {
      this.handler = https
    } else {
      throw Error(`Unknown or missing protocol, please use a supported protocol`)
    }

    // Populate an Object with the available HTTP methods
    for (let method of http.METHODS) {
      this[method.toLowerCase().replace(/\W/, '')] = trap.apply(this, [method, []])
    }

    return new Proxy(this, {
      get: (obj, prop) => {
        // Split the property by its capital letters if available
        const [method, ...path] = prop.split(/(?=[A-Z])/)

        if (!obj.hasOwnProperty(method)) {
          throw Error(`Unknown method "${method}", please use a supported HTTP verb`)
        }

        if (!path.length) {
          return obj[method]
        }

        return (...args) => this.request({ method, path }, ...args)
      }
    })
  }

  request ({ method = 'GET', path = [] }, ...options) {
    console.log(options)

    return new Promise((resolve, reject) => {
      const req = this.handler.request({
        hostname: this.hostname,
        path: '/' + path.join('/'),
        method
      }, res => {
        var data = ''

        res.on('data', chunk => {
          data += chunk
        })

        res.on('end', () => resolve(data))
      })

      req.end()

      req.on('error', (e) => {
        console.error(e)
      })
    })
  }
}

function trap (method, path) {
  return new Proxy(Function, {
    get: (obj, prop) => {
      return trap.apply(this, [method, [...path, prop]])
    },
    apply: (obj, self, args) => {
      return this.request({ method, path }, ...args)
    }
  })
}

const kraken = new module.exports('https://api.kraken.com')

kraken.get['0'].public.Time({
  pair: 'KFEE'
}).then(res => console.log(res))
