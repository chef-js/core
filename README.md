# chef-core

<img style="max-width: 100%;" src="https://raw.githubusercontent.com/chef-js/express/main/chef.png" width="150" />

<a href="https://badge.fury.io/js/chef-core"><img src="https://badge.fury.io/js/chef-core.svg" alt="npm package version" /></a> <a href="https://circleci.com/gh/chef-js/core"><img src="https://circleci.com/gh/chef-js/core.svg?style=shield" alt="tests status" /></a>

**web-sockets** micro-service manager and **static files server** at the same port,

designed for **node** written in **typescript**, with **tests**

- [chef-express](https://npmjs.com/package/chef-express) — just a webserver with cache and 404s fallback to index
- [chef-socket](https://npmjs.com/package/chef-socket) — like above, but with socket.io plugin capabilities
- [chef-uws](https://npmjs.com/package/chef-uws) — like above, but instead of express and socket.io it uses uWebSockets.js

## Running

Depending on variant you need, check readme of relevant npm package

```bash
npx chef-express ...
npx chef-socket ...
npx chef-uws ...
```

## Config

```ts
{
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
}
```

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

## License

MIT
