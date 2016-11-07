'use strict'

// Dependencies
const http = require('http')
const https = require('https')
const querystring = require('querystring')

exports.get = ({ protocol, hostname, path }, { query }) => {
  path = path.join('/')

  if (query) {
    path += `?${querystring.stringify(query)}`
  }

  return request(protocol, { hostname, path, method: 'get' })
}

function request (protocol, options) {
  var handler
  if (protocol === 'http:') {
    handler = http
  } else if (protocol === 'https:') {
    handler = https
  } else {
    throw Error(`Unknown protocol ${protocol}, please use a valid protocol`)
  }

  return new Promise((resolve, reject) => {
    const req = handler.request(options, res => {
      var data = ''

      res.on('data', chunk => {
        data += chunk
      })

      res.on('end', () => resolve(data))
    })

    req.end()

    req.on('error', err => reject(err))
  })
}
