"use strict";

const drowsy = require("drowsy");
const axios = require("axios");

const api = drowsy(axios, "http://localhost:3000");

console.time("start");

api.postBar({
  a: Array(100).fill('a'),
  b: Array(100).fill('b'),
  c: Array(100).fill('c'),
  d: Array(100).fill('d'),
  e: Array(100).fill('e'),
  f: Array(100).fill('f'),
  g: Array(100).fill('g'),
  h: Array(100).fill('h'),
  i: Array(100).fill('i'),
}).then((res) => {
  console.timeEnd("start");
});
