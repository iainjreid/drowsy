'use strict';

const drowsy = require('drowsy');
const server = require('drowsy/server');

const app = drowsy(server());

app.getPing((req, res) => {
  res.write('pong');
  res.end();
});

app.listen(3000, (server) => {
  console.log(server.address())
});
