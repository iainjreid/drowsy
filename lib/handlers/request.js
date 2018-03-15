'use strict'

// Dependencies
const url = require('url')
const request = require('request')

exports.setup = (defaults = {}) => {
  // Setup a curried call method
  const call = ((request) => {
    return (method) => {
      return ({ protocol, hostname, path }, opts = {}) => {
        const uri = url.format({ protocol, hostname, pathname: path.join('/') })

        return new Promise((resolve, reject) => {
          return request[method](uri, opts, (err, res) => {
            return err
              ? reject(err)
              : resolve(res)
          })
        })
      }
    }
  })(request.defaults(defaults))

  return {
    get: call('get'),
    head: call('head'),
    post: call('post'),
    put: call('put'),
    patch: call('patch'),
    del: call('del'),
    delete: call('delete')
  }
}
