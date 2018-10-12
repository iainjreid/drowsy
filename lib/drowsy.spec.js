/* eslint-env jest */

"use strict";

const drowsy = require("./drowsy");

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
