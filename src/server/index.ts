import {
  Config,
  CoreConsumer,
  FileReader,
  FileReaderCache,
  Server,
} from "../types.js";

import { Cache } from "@pietal.dev/cache";
import baseConfig from "../config.js";
import createFileReader from "./static-files.js";
import { populatePlugins } from "../plugins";

/**
 * this is either
 * @param {Config} config
 * @param {CoreConsumer} coreConsumer
 * @returns {Server}
 */
export default async function cook(
  inputConfig: Partial<Config>,
  { createServer, requestHandler }: CoreConsumer,
): Promise<Server> {
  const config = { ...baseConfig, ...inputConfig };

  // polulate config.plugins by requiring optional files
  await populatePlugins(config);

  // create the express or uws server inside a wrapper
  const server: Server = await createServer(config);

  // extend with resulting config
  server.config = config;

  // spread
  const { folder, maxCacheSize, type, port, plugins, ssl } = server.config;

  // create the static files reader based on folder
  const fileReader: FileReader = createFileReader(folder);

  // and create a cache for above
  const fileReaderCache: FileReaderCache = maxCacheSize
    ? new Cache(fileReader, maxCacheSize)
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
