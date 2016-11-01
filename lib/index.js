'use strict'

// Dependencies
const request = require('request')

// Available HTTP verbs
const verbs = ['get', 'head', 'post', 'put', 'patch', 'delete']

module.exports = hostname => {
  // Ensure that the Hostname is a string
  if (typeof hostname !== 'string') {
    throw Error('The hostname must be a string')
  }

  const _request = request.defaults({
    baseUrl: hostname
  })

  return new Proxy({}, {
    get: (target, name) => {
      // Deffered handling
      if (~verbs.indexOf(name)) {
        return trap(_request, name);
      }

      // Direct handling
      for (let i = 0, n = verbs.length; i < n; i++) {
        let verb = verbs[i]

        if (name.startsWith(verb)) {
          console.log(hostname + name.substr(verb.length).replace(/([A-Z])/g, '/$1'))
          return (...args) => _request.get(name.substr(verb.length).replace(/([A-Z])/g, '/$1'), ...args)
        }
      }

      throw Error('Unkwown Function prefix, please ensure that methods begin with a supported HTTP verb')
    }
  })
}

function trap(verb) {
  return
}

const kraken = module.exports('https://api.kraken.com/0/public')

kraken.get.AssetPairs({
  pair: 'KFEE'
}, (err, response) => {
  console.log(response.url)
})
