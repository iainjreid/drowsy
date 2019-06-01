"use strict";

const axios = require("axios");
const server = require("../main/drowsy-server");

const app = server();

app.get("/foo", async (req, res) => {
  res.end("GET: bar");
});

app.get("/foo/bar", async (req, res) => {
  res.end("GET: baz");
});

app.post("/foo", async (req, res) => {
  res.end("POST: bar");
});

app.post("/foo/bar", async (req, res) => {
  res.end("POST: baz");
});

const checks = [
  [request("get", "http://localhost:3000/foo"), "GET: bar"],
  [request("get", "http://localhost:3000/foo/bar"), "GET: baz"],
  [request("post", "http://localhost:3000/foo"), "POST: bar"],
  [request("post", "http://localhost:3000/foo/bar"), "POST: baz"],
  [request("get", "http://localhost:3000/bar"), "Not found"],
]

describe("drowsy-server", () => {
  beforeAll(() => app.listen(3000));
  afterAll(() => app.close());

  test.each(checks)("ensure response is correct (%#)", async (actual, expected) => {
    expect(await actual()).toEqual(expected);
  });
});

function request(method, url) {
  return () => axios[method](url).then(({ data }) => data);
}
