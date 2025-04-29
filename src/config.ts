import { Config } from "./types";
import { getParam } from "./get-param";
import { resolve } from "path";

const ssl: { key: string; cert: string } = {
  key: getParam("key", resolve(__dirname, "..", "ssl", "example.key")),
  cert: getParam("cert", resolve(__dirname, "..", "ssl", "example.crt")),
};

const DEFAULT_FOLDER = ".";

const DEFAULT_PORT = "3000";

const DEFAULT_CACHE_SIZE = "0";

const config: Config = {
  // folder to static serve files
  folder: process.argv[2] || DEFAULT_FOLDER,
  // port on which the server listens
  port: Number(getParam("port", DEFAULT_PORT)),
  // max cache size prevents oom, set to 0 to disable cache
  cache: parseInt(getParam("cache", DEFAULT_CACHE_SIZE)),
  // this enables http/ws logs
  debug: process.argv.includes("--debug"),
  // serve index.html on 404
  spa: process.argv.includes("--spa"),
  // ssl = null | { key, cert }
  ssl: process.argv.includes("--ssl") ? ssl : null,
  // type of server to start
  type: "core", // "express" | "socket" | "uws"
  // {Record<string, Plugin>} for cli use --plugin ./plugin.js any x of times
  plugins: {},
  // handshake event
  join: getParam("join", "/join"),
  // disconnect from room event
  leave: getParam("leave", "/leave"),
};

export default config;
