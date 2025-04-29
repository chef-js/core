# chef-core

<img style="max-width: 100%; float: right;" src="https://raw.githubusercontent.com/chef-js/core/main/chef.svg" alt="kisscc0" width="200" height="200" />

[<img src="https://img.shields.io/npm/v/chef-core?style=for-the-badge&color=success" alt="npm version" />](https://www.npmjs.com/package/chef-core?activeTab=versions)
[<img src="https://img.shields.io/circleci/build/github/Prozi/chef-core/main?style=for-the-badge" alt="build status" />](https://app.circleci.com/pipelines/github/Prozi/chef-core)

**chef-core** is a micro-service manager for web sockets and a static files server, designed for Node.js and written in TypeScript. It includes tests to ensure reliability.

## Static Serve Folder

This library offers three different variants/flavors. Depending on the variant you need, refer to the relevant npm package's readme for instructions.

To get started with the basic usage, follow these steps:

```bash
# Serve 'dist' folder using express flavor on localhost:3000
$ npx chef-express dist

# Serve 'dist' folder using socket.io flavor on localhost:3000
$ npx chef-socket dist
```

## Chat Demo

Check out the minimal chat demo at https://chef-socket.pietal.dev

To set up the demo using `chef-socket`, run the following commands:

```bash
$ yarn add chef-socket
$ yarn chef-socket node_modules/chef-socket/demo --plugin node_modules/chef-core/chat.js
```

## API Documentation

For detailed API documentation, and types, refer to the [chef-core API](https://chef-js.github.io/core/)

To serve the `dist` folder with express flavor on localhost:443, with development ssl, disabling cache:

```bash
$ npx chef-express dist --ssl --port 443 --maxCacheSize 0
```

To serve the `dist` folder with socket flavor on localhost:3000, with a WebSocket plugin, in debug mode:

```bash
$ npx chef-socket dist --plugin ./path/to/plugin.js --debug
```

## Configuration

You can read the default configuration by using the following code:

```ts
import { config, type Config } from "chef-core";
```

Alternatively, you can declare a custom configuration by omitting the defaults that don't suit your needs. Here's how the default config looks like:

```js
{
  "folder": "first parameter of cli", // default .
  "port": "--port", // default 3000
  "maxCacheSize": "--max-cache-size", // default 128
  "join": "--join", // default /join
  "leave": "--leave", // default /leave
  "plugins": "--plugin path/to/plugin.js", // default {}
  "spa": "--spa", // default undefined
  "ssl": "--ssl", // default false
  "debug": "--debug" // default false
}
```

You can also check the resulting `server.config` after the server has started.

## Plugins

To use plugins, you can import the `chef-socket` package and include the desired plugin. Here's an example:

```ts
const cook = require("chef-socket"); // or chef-uws
const chat = require("chef-core/chat");

cook({ plugins: { chat } }).then((server) => {
  console.log(server.config);
});
```

## License

This project is licensed under the MIT License.
