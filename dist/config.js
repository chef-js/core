"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const get_param_1 = require("./get-param");
const ssl = {
  key: (0, get_param_1.getParam)(
    "key",
    (0, path_1.resolve)(__dirname, "..", "ssl", "example.key")
  ),
  cert: (0, get_param_1.getParam)(
    "cert",
    (0, path_1.resolve)(__dirname, "..", "ssl", "example.crt")
  ),
};
const config = {
  // folder to static serve files
  folder: process.argv[2],
  // max cache size prevents oom, set to 0 to disable cache
  maxCacheSize: parseInt((0, get_param_1.getParam)("maxCacheSize", "128")),
  // this enables http/ws logs
  debug: process.argv.includes("--debug"),
  // ssl = undefined | { key, cert }
  ssl: process.argv.includes("--ssl") ? ssl : undefined,
  // port on which the server listens
  port: Number((0, get_param_1.getParam)("port", process.env.PORT || "4200")),
  // typeof Record<string, Plugin>, for cli use --plugin ./plugin.js any x of times
  plugins: {},
  // handshake event
  join: (0, get_param_1.getParam)("join", "/join"),
  // disconnect from room event
  leave: (0, get_param_1.getParam)("leave", "/leave"),
  // type of server to start
  type: "core", // "express" | "socket" | "uws"
};
exports.default = config;
