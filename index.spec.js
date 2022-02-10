"use strict";

describe("GIVEN chef is provided", () => {
  const createMockServer = async (config) => {
    const http = require("http");
    const server = http.createServer();

    server.listen(config.port);

    return server;
  };

  it("THEN requiring the library does not throw an error", () => {
    require(".");
  });

  describe("WHEN it is instantiated", () => {
    it("THEN it should initialize without throwing error", () => {
      const { default: startServer } = require("./dist");

      expect(() =>
        startServer(
          { type: "uws", folder: "demo", port: 3001 },
          createMockServer
        )
      ).not.toThrow();
    });

    it("THEN initialization should return a truthy instance", async () => {
      const { default: startServer } = require("./dist");

      expect(
        await startServer(
          { type: "uws", folder: "demo", port: 3002 },
          createMockServer
        )
      ).toBeTruthy();
    });
  });

  describe("WHEN chef is initialized in debug mode", () => {
    it("THEN it should not throw error", async () => {
      const { default: startServer } = require("./dist");
      const api = await startServer(
        {
          folder: "demo",
          debug: true,
          port: 3003,
        },
        createMockServer
      );

      expect(api).toBeTruthy();
    });
  });

  describe("WHEN chef.serve is run on demo folder", () => {
    it("THEN it should not throw error", async () => {
      const { default: startServer } = require("./dist");
      const test = async () =>
        await startServer(
          {
            type: "uws",
            debug: true,
            folder: "demo",
            port: 3004,
          },
          createMockServer
        );

      expect(test).not.toThrow();
    });
  });

  describe("WHEN chef is initialized on specified port", () => {
    it("THEN it should start without error", async () => {
      const { default: startServer } = require("./dist");
      const server = await startServer(
        {
          type: "uws",
          folder: "demo",
          port: 8080,
        },
        createMockServer
      );

      expect(server).toBeTruthy();
    });
  });

  describe("WHEN chef is initialized with plugin", () => {
    it("THEN it should start without error", async () => {
      const { default: startServer } = require("./dist");
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
        createMockServer
      );

      expect(server).toBeTruthy();
    });
  });
});
