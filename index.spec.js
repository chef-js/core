"use strict";

describe("GIVEN chef is provided", () => {
  const createServer = async (_config) => {
    const mockServer = {
      start: () => mockServer,
      get: () => null,
    };

    return mockServer;
  };

  const requestHandler = () => null;

  it("THEN requiring the library does not throw an error", () => {
    require(".");
  });

  describe("WHEN it is instantiated", () => {
    it("THEN it should initialize without throwing error", () => {
      const { cook } = require(".");

      expect(() =>
        cook(
          { type: "socket", folder: "demo", port: 3001 },
          { createServer, requestHandler },
        ),
      ).not.toThrow();
    });

    it("THEN initialization should return a truthy instance", async () => {
      const { cook } = require(".");

      expect(
        await cook(
          { type: "socket", folder: "demo", port: 3002 },
          { createServer, requestHandler },
        ),
      ).toBeTruthy();
    });

    it("THEN initialization should have expected default values", async () => {
      const { cook } = require(".");
      const server = await cook({}, { createServer, requestHandler });

      const defaultValues = {
        folder: ".",
        port: 3000,
        cache: 0,
        join: "/join",
        leave: "/leave",
        plugins: {},
        ssl: null,
        spa: false,
        debug: false,
      };

      Object.entries(defaultValues).forEach(([key, value]) => {
        const result = server.config[key];

        expect(value).toEqual(result);
      });
    });
  });

  describe("WHEN chef is initialized in debug mode", () => {
    it("THEN it should not throw error", async () => {
      const { cook } = require(".");
      const api = await cook(
        {
          folder: "demo",
          debug: true,
          port: 3003,
        },
        { createServer, requestHandler },
      );

      expect(api).toBeTruthy();
    });
  });

  describe("WHEN chef is run on demo folder", () => {
    it("THEN it should not throw error", async () => {
      const { cook } = require(".");
      const test = async () =>
        await cook(
          {
            type: "uws",
            debug: true,
            folder: "demo",
            port: 3004,
          },
          { createServer, requestHandler },
        );

      expect(test).not.toThrow();
    });
  });

  describe("WHEN chef is initialized on specified port", () => {
    it("THEN it should start without error", async () => {
      const { cook } = require(".");
      const server = await cook(
        {
          type: "uws",
          folder: "demo",
          port: 8080,
        },
        { createServer, requestHandler },
      );

      expect(server).toBeTruthy();
    });
  });

  describe("WHEN chef is initialized with plugin", () => {
    it("THEN it should start without error", async () => {
      const { cook } = require(".");
      const server = await cook(
        {
          folder: "demo",
          port: 3000,
          plugins: {
            chat: function () {
              done();
            },
          },
        },
        { createServer, requestHandler },
      );

      expect(server).toBeTruthy();
    });
  });

  describe("WHEN chef is initialized with shimmed plugin", () => {
    it("THEN it should start without error", async () => {
      const { cook } = require(".");
      const shim = require("./shim");
      const chat = shim("chat", {
        initialize: (io) => console.log(io),
        handshake: (ws, event) => console.log(ws, event),
      });
      const server = await cook(
        {
          folder: "demo",
          port: 4201,
          plugins: { chat },
        },
        { createServer, requestHandler },
      );

      expect(server).toBeTruthy();
    });
  });
});
