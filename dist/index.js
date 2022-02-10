"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_js_1 = __importDefault(require("./config.js"));
// dynamically start server
async function startServer(userConfig = {}, createServer) {
    // merge configurations
    const config = { ...config_js_1.default, ...userConfig };
    // dynamically create wrapped compatible express or uws server
    const server = await createServer(config);
    // mandatory started message
    console.info(`Started ${config.type} app on port`, config.port);
    if (Object.keys(config.plugins).length) {
        console.info("with plugin(s)", Object.keys(config.plugins).join(", "));
    }
    // resolve with server
    return server;
}
exports.default = startServer;
