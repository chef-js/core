"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chef = void 0;
const latermom_1 = require("latermom");
const config_js_1 = __importDefault(require("../config.js"));
const static_files_js_1 = __importDefault(require("./static-files.js"));
const plugins_1 = require("../plugins");
/**
 * this is either
 * @param {WSConfig} config
 * @param {WSCoreConsumer} coreConsumer
 * @returns {WSServer}
 */
async function chef(config, { createServer, requestHandler }) {
    const mergedConfig = { ...config_js_1.default, ...config };
    // polulate config.plugins by requiring optional files
    await (0, plugins_1.populatePlugins)(mergedConfig);
    // create the express or uws server inside a wrapper
    const server = await createServer(mergedConfig);
    // extend with resulting config
    server.config = mergedConfig;
    // spread
    const { folder, maxCacheSize, type, port, plugins } = server.config;
    // create the static files reader based on folder
    const fileReader = (0, static_files_js_1.default)(folder);
    // and create a cache for above
    const fileReaderCache = maxCacheSize
        ? new latermom_1.Cache(fileReader, maxCacheSize)
        : { get: fileReader };
    // give library consumer one frame to setup his own routes
    setTimeout(() => {
        // everything goes to the reader
        server.get("/*", requestHandler(fileReaderCache));
    });
    // make server listen on process.env.PORT || 4200
    await server.start(port);
    // mandatory started message
    console.info(`Started ${type} app on port`, port);
    if (Object.keys(plugins).length) {
        console.info("with plugin(s)", Object.keys(plugins).join(", "));
    }
    // finally
    return server;
}
exports.chef = chef;
