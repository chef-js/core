"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const ssl = {
    key: getParam("key", (0, path_1.resolve)(__dirname, "..", "ssl", "example.key")),
    cert: getParam("cert", (0, path_1.resolve)(__dirname, "..", "ssl", "example.crt")),
};
const config = {
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
    // max cache size prevents oom
    maxCacheSize: 128,
};
function getParam(find, fallback) {
    const matches = process.argv
        .join(" ")
        .match(new RegExp(`--${find} ([^ ]+)`));
    return matches ? matches[1] : fallback;
}
exports.default = config;
