"use strict";

describe("GIVEN chef is provided", () => {
  const createServer = async (_config) => {
    return {
      get: () => null,
      listen: () => null,
    };
  };

  const requestHandler = () => null;

  it("THEN requiring the library does not throw an error", () => {
    require(".");
  });

  describe("WHEN it is instantiated", () => {
    it("THEN it should initialize without throwing error", () => {
      const startServer = require(".");

      expect(() =>
        startServer(
          { type: "uws", folder: "demo", port: 3001 },
          { createServer, requestHandler }
        )
      ).not.toThrow();
    });

    it("THEN initialization should return a truthy instance", async () => {
      const startServer = require(".");

      expect(
        await startServer(
          { type: "uws", folder: "demo", port: 3002 },
          { createServer, requestHandler }
        )
      ).toBeTruthy();
    });
  });

  describe("WHEN chef is initialized in debug mode", () => {
    it("THEN it should not throw error", async () => {
      const startServer = require(".");
      const api = await startServer(
        {
          folder: "demo",
          debug: true,
          port: 3003,
        },
        { createServer, requestHandler }
      );

      expect(api).toBeTruthy();
    });
  });

  describe("WHEN chef.serve is run on demo folder", () => {
    it("THEN it should not throw error", async () => {
      const startServer = require(".");
      const test = async () =>
        await startServer(
          {
            type: "uws",
            debug: true,
            folder: "demo",
            port: 3004,
          },
          { createServer, requestHandler }
        );

      expect(test).not.toThrow();
    });
  });

  describe("WHEN chef is initialized on specified port", () => {
    it("THEN it should start without error", async () => {
      const startServer = require(".");
      const server = await startServer(
        {
          type: "uws",
          folder: "demo",
          port: 8080,
        },
        { createServer, requestHandler }
      );

      expect(server).toBeTruthy();
    });
  });

  describe("WHEN chef is initialized with plugin", () => {
    it("THEN it should start without error", async () => {
      const startServer = require(".");
      const server = await startServer(
        {
          folder: "demo",
          port: 4200,
          plugins: {
            chat: function () {
              done();
            },
          },
        },
        { createServer, requestHandler }
      );

      expect(server).toBeTruthy();
    });
  });
});
