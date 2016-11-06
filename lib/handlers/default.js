'use strict'

// Dependencies
const https = require('https')

exports.get = ({ hostname, path }, ...options) => {
  return new Promise((resolve, reject) => {
    https.get(`https://${hostname}/${path.join('/')}`, res => {
      var data = ''

      res.on('data', chunk => {
        data += chunk
      })

      res.on('end', () => resolve(data))
    }).on('error', err => reject(err))
  })
}
