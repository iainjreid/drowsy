'use strict';

const axios = require('axios');
const drowsy = require('drowsy');

const api = drowsy(axios, 'http://localhost:3000');

api.getPing().then((res) => {
  console.log(res);
});
