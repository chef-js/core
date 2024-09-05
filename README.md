# chef-core

<img style="max-width: 100%; float: right;" src="https://raw.githubusercontent.com/chef-js/core/main/chef.svg" alt="kisscc0" width="200" height="200" />

[<img src="https://badge.fury.io/js/chef-core.svg" alt="npm package version" />](https://badge.fury.io/js/chef-core) [<img src="https://circleci.com/gh/chef-js/core.svg?style=shield" alt="tests status" />](https://circleci.com/gh/chef-js/core) [<img src="https://img.shields.io/npm/dw/chef-core.svg?color=success" alt="npm downloads per week" />](https://www.npmts.com/package/chef-core)

**chef-core** is a micro-service manager for web sockets and a static files server, designed for Node.js and written in TypeScript. It includes tests to ensure reliability.

This package is a core dependency used in three flavors:

- [chef-express](https://npmjs.com/package/chef-express) an `express` web server with cache and fallback to index for 404s.
- [chef-socket](https://npmjs.com/package/chef-socket) similar to `chef-express`, but with `socket.io` plugin capabilities on the same port.
- [chef-uws](https://npmjs.com/package/chef-uws) similar to `chef-socket`, but uses `uWebSockets.js` instead of `express` and `socket.io`.

## Minimal Chat Demo

Check out the minimal chat demo at https://chef-js-socket.herokuapp.com/

To set up the demo using `chef-socket`, run the following commands:

```bash
$ yarn add chef-socket
$ yarn chef-socket node_modules/chef-socket/demo --plugin node_modules/chef-core/chat.js
```

Alternatively, for microWebSockets, see https://chef-js-uws.herokuapp.com/

To set up the demo using `chef-uws`, run the following commands:

```bash
$ yarn add chef-uws
$ yarn chef-uws node_modules/chef-uws/demo --plugin node_modules/chef-core/chat.js
```

## API Documentation

For detailed API documentation, and types, refer to the [chef-core API](https://chef-js.github.io/core/)

## Running

This library offers three different variants/flavors. Depending on the variant you need, refer to the relevant npm package's readme for instructions.

To get started with the basic usage, follow these steps:

```bash
# Serve 'dist' folder using express flavor on localhost:4200
$ npx chef-express dist

# Serve 'dist' folder using socket.io flavor on localhost:4200
$ npx chef-socket dist

# Serve 'dist' folder using uws flavor on localhost:4200
$ npx chef-uws dist
```

To serve the `dist` folder with express flavor on localhost:443, with development ssl, disabling cache:

```bash
$ npx chef-express dist --ssl --port 443 --maxCacheSize 0
```

To serve the `dist` folder with socket flavor on localhost:4200, with a WebSocket plugin, in debug mode:

```bash
$ npx chef-socket dist --plugin ./path/to/plugin.js --debug
```

## Configuration

You can read the default configuration by using the following code:

```ts
const config = require("chef-core/config");
```

Alternatively, you can declare a custom configuration by omitting the defaults that don't suit your needs. Here's how the default config looks like:

```ts
const { Config, getParams } = require("chef-core");

const config: Config = {
  // serve 404s as index.html
  spa: true,
  // folder to static serve files
  folder: process.argv[2],
  // max cache size prevents oom, set to 0 to disable cache
  maxCacheSize: parseInt(getParam("maxCacheSize", "128")),
  // this enables http/ws logs
  debug: process.argv.includes("--debug"),
  // ssl = undefined | { key, cert }
  ssl: process.argv.includes("--ssl") ? ssl : undefined,
  // port on which the server listens
  port: Number(getParam("port", process.env.PORT || "4200")),
  // typeof Record<string, Plugin>, for cli use --plugin ./plugin.js any x of times
  plugins: {},
  // handshake event
  join: getParam("join", "/join"),
  // disconnect from room event
  leave: getParam("leave", "/leave"),
  // type of server to start
  type: "core", // "core" | "express" | "socket" | "uws"
};
```

You can also check the resulting `server.config` after the server has started.

## Plugins

To use plugins, you can import the `chef-socket` or `chef-uws` package and include the desired plugin. Here's an example:

```ts
const chef = require("chef-socket"); // or chef-uws
const chat = require("chef-core/chat");

chef({ plugins: { chat } }).then((server) => {
  console.log(server.config);
});
```

## Shim

You can use the `{ initialize, handshake }` format for plugins as well. Here's an example:

```ts
const chef = require("chef-socket"); // or chef-uws
const shim = require("chef-core/shim");

const example = shim("example", {
  initialize: (io) => {
    // initialize your game, this happens once
    console.log("example plugin initialized");
  },
  handshake: (socket) => {
    // this happens once per socket, on connection
    console.log("socket connected");

    socket.on("event", ({ id, event, data }) => {
      // do something with an event
    });
  },
});

chef({ plugins: { example } }).then((server) => {
  console.log(server.config);
});
```

## License

This project is licensed under the MIT License.
