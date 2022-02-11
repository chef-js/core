"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const config_js_1 = __importDefault(require("./config.js"));
const server_1 = __importDefault(require("./server"));
// dynamically start server
async function startServer(userConfig = {}, { createServer, requestHandler }) {
  // merge configurations
  const config = { ...config_js_1.default, ...userConfig };
  // dynamically create wrapped compatible express or uws server
  const server = await (0, server_1.default)(config, {
    createServer,
    requestHandler,
  });
  // mandatory started message
  console.info(`Started ${config.type} app on port`, config.port);
  if (Object.keys(config.plugins).length) {
    console.info("with plugin(s)", Object.keys(config.plugins).join(", "));
  }
  // resolve with server
  return server;
}
exports.default = startServer;
