import { WSConfig } from "./types";
import { resolve } from "path";

const ssl: { key: string; cert: string } = {
  key: getParam("key", resolve(__dirname, "..", "ssl", "example.key")),
  cert: getParam("cert", resolve(__dirname, "..", "ssl", "example.cert")),
};

const config: WSConfig = {
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
};

function getParam(find: string, fallback: string): string {
  const matches: RegExpMatchArray | null = process.argv
    .join(" ")
    .match(new RegExp(`--${find} ([^ ]+)`));

  return matches ? matches[1] : fallback;
}

export default config;
