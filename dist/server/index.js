"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cache_1 = __importDefault(require("../cache"));
const static_files_js_1 = __importDefault(require("./static-files.js"));
const plugins_1 = require("../plugins");
const config_js_1 = __importDefault(require("../config.js"));
async function startServer(userConfig = {}, { createServer, requestHandler, }) {
    const config = { ...config_js_1.default, ...userConfig };
    await (0, plugins_1.populatePlugins)(config);
    // create the express or uws server inside a wrapper
    const server = await createServer(config);
    // create the static files reader based on folder
    const fileReader = (0, static_files_js_1.default)(config.folder);
    // and create a cache for above
    const fileReaderCache = new cache_1.default(fileReader);
    // everything goes to the reader
    server.get("/*", requestHandler(fileReaderCache));
    // finally start the server on process.env.PORT || 4200
    await server.listen(config.port);
    return server;
}
exports.default = startServer;
