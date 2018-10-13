/* eslint-env jest */

"use strict";

const drowsy = require("./drowsy");

const handler = {
  get(url) {
    return `GET:${url}`;
  },
  post(url) {
    return `POST:${url}`;
  }
};

describe("importing the module", () => {
  it("should be a function", () => {
    expect(typeof drowsy).toBe("function");
  });

  it('should have a "handleRequest" method', () => {
    expect(typeof drowsy.handleRequest).toBe("function");
  });

  it('should have a "handleLookup" method', () => {
    expect(typeof drowsy.handleLookup).toBe("function");
  });
});

fdescribe("default export", () => {
  it("should generate a valid URL (1)", () => {
    expect(drowsy(handler, "").getFoo()).toBe("GET:/foo");
  });

  it("should generate a valid URL (2)", () => {
    expect(drowsy(handler, "").postFoo.bar()).toBe("POST:/foo/bar");
  });

  it("should generate a valid URL (3)", () => {
    expect(drowsy(handler, "").get.foo()).toBe("GET:/foo");
  });

  it("should generate a valid URL (4)", () => {
    expect(drowsy(handler, "").fooBar.post()).toBe("POST:/foo/bar");
  });

  it("should generate a valid URL (5)", () => {
    expect(drowsy(handler, "").foo.getBar()).toBe("GET:/foo/bar");
  });

  it("should generate a valid URL (6)", () => {
    expect(drowsy(handler, "").foo.post.bar()).toBe("POST:/foo/bar");
  });
});
