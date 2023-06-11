"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const ssl = {
  key: getParam(
    "key",
    (0, path_1.resolve)(__dirname, "..", "ssl", "example.key")
  ),
  cert: getParam(
    "cert",
    (0, path_1.resolve)(__dirname, "..", "ssl", "example.crt")
  ),
};
const config = {
  // folder to static serve files
  folder: process.argv[2],
  // max cache size prevents oom, set to 0 to disable cache
  maxCacheSize: parseInt(getParam("maxCacheSize", "128")),
  // this enables http/ws logs
  debug: process.argv.includes("--debug"),
  // ssl = undefined | { key, cert }
  ssl: process.argv.includes("--ssl") ? ssl : undefined,
  // port on which the server listens
  port: Number(process.env.PORT || 4200),
  // typeof Record<string, Plugin>, for cli use --plugin ./plugin.js any x of times
  plugins: {},
  // handshake event
  join: getParam("join", "/join"),
  // disconnect from room event
  leave: getParam("leave", "/leave"),
  // type of server to start
  type: "core", // "express" | "socket" | "uws"
};
function getParam(find, fallback) {
  const matches = process.argv.join(" ").match(new RegExp(`--${find} ([^ ]+)`));
  return matches ? matches[1] : fallback;
}
exports.default = config;
