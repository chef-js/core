# chef-core

<img style="max-width: 100%;" src="https://raw.githubusercontent.com/chef-js/express/main/chef.png" width="150" />

<a href="https://badge.fury.io/js/chef-core"><img src="https://badge.fury.io/js/chef-core.svg" alt="npm package version" /></a> <a href="https://circleci.com/gh/chef-js/core"><img src="https://circleci.com/gh/chef-js/core.svg?style=shield" alt="tests status" /></a>

**web-sockets** micro-service manager and **static files server** at the same port,

designed for **node** written in **typescript**, with **tests**

this is a **core dependency** package used in 3 flavors:

- [chef-express](https://npmjs.com/package/chef-express) — just a webserver with cache and 404s fallback to index
- [chef-socket](https://npmjs.com/package/chef-socket) — like above, but with socket.io plugin capabilities
- [chef-uws](https://npmjs.com/package/chef-uws) — like above, but instead of express and socket.io it uses uWebSockets.js

## Minimal Chat Demo

https://chef-js-socket.herokuapp.com/

```bash
$ yarn add chef-socket
$ yarn chef-socket node_modules/chef-socket/demo --plugin node_modules/chef-core/chat.js
```

https://chef-js-uws.herokuapp.com/

```bash
$ yarn add chef-uws
$ yarn chef-uws node_modules/chef-uws/demo --plugin node_modules/chef-core/chat.js
```

## Running

depending on variant you need, check readme of relevant npm package

```bash
npx chef-express ...
npx chef-socket ...
npx chef-uws ...
```

## Config

you can read the default config by

```ts
const config = require("chef-core/config");
```

or declare omiting the defaults that suit you, as below

```ts
const config = {
  // this enables http/ws logs
  debug: process.argv.includes("--debug"),
  // port on which the server listens
  port: Number(process.env.PORT || 4200),
  // you can use --plugin ./path/to/plugin.js any number of times
  plugins: {},
  // handshake event
  join: "/join",
  // disconnect from room event
  leave: "/leave",
  // folder to static serve files
  folder: process.argv[2],
  // type of server to start
  type: process.argv.includes("--uws") ? "uws" : "express",
  // ssl = undefined | { key, cert }
  ssl: process.argv.includes("--ssl") ? ssl : undefined,
};
```

or check resulting `server.config` after server has started

## Plugins

```ts
const chef = require("chef-socket"); // or chef-uws
const chat = require("chef-core/chat");

chef({ plugins: { chat } }).then((server) => {
  console.log(server.config);
});
```

## Shim

you can use `{ initialize, handshake }` format for plugins too

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

MIT
