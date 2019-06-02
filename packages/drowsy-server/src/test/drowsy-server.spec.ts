/// <reference types="@types/jest" />

import * as axios from "axios";
import * as server from "../main/drowsy-server";

const app = server();

const request = (method: axios.Method, url: string) => () =>
  axios.default.request({ method, url }).then(({ data }) => data);

app.get("/foo", (req, res) => {
  res.end("GET: bar");
});

app.get("/foo/bar", (req, res) => {
  res.end("GET: baz");
});

app.post("/foo", (req, res) => {
  res.end("POST: bar");
});

app.post("/foo/bar", (req, res) => {
  res.end("POST: baz");
});

const checks = [
  { actual: request("get", "http://localhost:3000/foo"), expected: "GET: bar" },
  { actual: request("get", "http://localhost:3000/foo/bar"), expected: "GET: baz" },
  { actual: request("post", "http://localhost:3000/foo"), expected: "POST: bar" },
  { actual: request("post", "http://localhost:3000/foo/bar"), expected: "POST: baz" },
  { actual: request("get", "http://localhost:3000/bar"), expected: "Not found" },
]

describe("drowsy-server", () => {
  beforeAll(() => app.listen(3000));
  afterAll(() => app.close());

  test.each(checks)("ensure response is correct (%#)", async ({ actual, expected }) => {
    expect(await actual()).toEqual(expected);
  });
});
