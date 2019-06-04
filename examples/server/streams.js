"use strict";

const server = require("drowsy/server");
const streams = require("drowsy/server-streams");

const app = server();

app.use(streams.middleware);

app.post("/foo", (req, res) => {
  req[streams.ref]({
    "a": (body) => {
      res.write("a")
    },
    "b": (body) => {
      res.write("b")
    },
    "c": (body) => {
      res.write("c")
    },
    "d": (body) => {
      res.write("d")
    },
    "e": (body) => {
      res.write("e")
    },
    "f": (body) => {
      console.log("f", Date.now())
      res.write("f")
    },
    "g": (body) => {
      res.write("g")
    },
    "h": (body) => {
      res.write("h")
    },
    "i": (body) => {
      res.write("i")
    },
  }).then(() => {
    res.end();
  });
});

app.post("/bar", (req, res) => {
  let body = [];

  req.on('data', (chunk) => {
    body.push(chunk);
  })

  req.on('end', () => {
    body = Buffer.concat(body).toString();

    res.write("a")
    res.write("b")
    res.write("c")
    res.write("d")
    res.write("e")
    res.write("f")
    res.write("g")
    res.write("h")
    res.write("i")

    res.end();
  });
});

app.listen(3000, () => {
  console.log("Ready, localhost:%s", app.address().port);
});
