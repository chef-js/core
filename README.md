# chef-core

[<img src="https://img.shields.io/npm/v/chef-core?style=for-the-badge&color=success" alt="npm version" />](https://www.npmjs.com/package/chef-core?activeTab=versions)
[<img src="https://img.shields.io/circleci/build/github/chef-js/core/main?style=for-the-badge" alt="build status" />](https://app.circleci.com/pipelines/github/chef-js/core)
rt cooking!

- **chef-*** is a **static-files-server**
- written in **typescript**
- usable as a **command-line-tool** (or **runtime library**)
- with **many tests** and **continuous-integration**
- optional **404** fallback to **index.html** with a **200** status code (spa)
- optional **cache**
- optional **web-sockets** micro-service manager on **same port**

# Express

[<img src="https://img.shields.io/npm/v/chef-express?style=for-the-badge&color=success" alt="npm version" />](https://www.npmjs.com/package/chef-express?activeTab=versions)
[<img src="https://img.shields.io/circleci/build/github/chef-js/express/main?style=for-the-badge" alt="build status" />](https://app.circleci.com/pipelines/github/chef-js/express)

The most basic flavor of the core library - serve folder. port defaults to 3000

```
npx chef-express folder
```

see [chef-express](https://github.com/chef-js/express) for more information about command line parameters

# Socket

[<img src="https://img.shields.io/npm/v/chef-socket?style=for-the-badge&color=success" alt="npm version" />](https://www.npmjs.com/package/chef-socket?activeTab=versions)
[<img src="https://img.shields.io/circleci/build/github/chef-js/socket/main?style=for-the-badge" alt="build status" />](https://app.circleci.com/pipelines/github/chef-js/socket)

On top of the base adds socket.io for websockets functionality on the same port.

```
npx chef-socket folder [--plugin node_modules/chef-socket/chat.js]
```

see [chef-socket](https://github.com/chef-js/socket) to find out more

## demo (with chat plugin)

https://chef-socket.pietal.dev/

## API Documentation

For detailed API documentation, and types, refer to the [chef-core API](https://chef-js.github.io/core/)

To serve the `dist` folder with express flavor on localhost:443, with development ssl, setting max file cache to 1000 entries:

```bash
$ npx chef-express dist --ssl --port 443 --maxCacheSize 1000
```

To serve the `dist` folder with socket flavor on localhost:3000, with a WebSocket plugin, in debug mode:

```bash
$ npx chef-socket dist --plugin ./path/to/plugin.js --debug
```

## Configuration

You can read the default configuration by using the following code:

```ts
import { config, type Config } from "chef-[core/express/socket]";
```

Alternatively, you can declare a custom configuration by omitting the defaults that don't suit your needs. Here's how the default config looks like:

```js
{
  "folder": ".",      // first parameter of cli
  "port": 3000,       // --port n
  "maxCacheSize": 0,   // --max-cache-size n
  "join": "/join",     // --join /join
  "leave": "/leave",   // --leave /leave
  "plugins": {},       // --plugin path/to/plugin.js
  "spa": false,        // --spa
  "debug": false,      // --debug
  "ssl": undefined,    // --ssl
}
```

You can also check the resulting `server.config` after the server has started.

This project is licensed under the MIT License.
