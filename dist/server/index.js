"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = cook;
const cache_1 = require("@pietal.dev/cache");
const config_js_1 = __importDefault(require("../config.js"));
const static_files_js_1 = __importDefault(require("./static-files.js"));
const plugins_1 = require("../plugins");
/**
 * this is either
 * @param {Config} inputConfig
 * @param {CoreConsumer} coreConsumer
 * @returns {Server}
 */
async function cook(inputConfig, { createServer, requestHandler }) {
  const config = { ...config_js_1.default, ...inputConfig };
  // polulate config.plugins by requiring optional files
  await (0, plugins_1.populatePlugins)(config);
  // create the express or uws server inside a wrapper
  const server = await createServer(config);
  // extend with resulting config
  server.config = config;
  server.config.folder ||= ".";
  // spread
  const { folder, maxCacheSize, type, port, plugins, ssl } = server.config;
  // create the static files reader based on folder
  const fileReader = (0, static_files_js_1.default)(folder);
  // and create a cache for above
  const fileReaderCache = maxCacheSize
    ? new cache_1.Cache(fileReader, maxCacheSize)
    : { get: fileReader };
  // make server listen on process.env.PORT || 3000
  await server.start(port);
  // give library consumer one frame to setup his own routes
  setTimeout(() => {
    // everything goes to the reader
    server.get("/*", requestHandler(fileReaderCache));
  });
  // mandatory started message
  console.info(`Started ${type} ${ssl ? "https" : "http"}://localhost:${port}`);
  if (Object.keys(plugins).length) {
    console.info("with plugin(s)", Object.keys(plugins).join(", "));
  }
  // finally
  return server;
}
