import { Cache } from "@pietal.dev/cache";
import baseConfig from "../config.js";
import createFileReader from "./static-files.js";
import {
  Config,
  FileReader,
  FileReaderCache,
  Server,
  CoreConsumer,
} from "../types.js";
import { populatePlugins } from "../plugins";

/**
 * this is either
 * @param {Config} config
 * @param {CoreConsumer} coreConsumer
 * @returns {Server}
 */
export async function chef(
  config: Partial<Config>,
  { createServer, requestHandler }: CoreConsumer,
): Promise<Server> {
  const mergedConfig: Config = { ...baseConfig, ...config };

  // polulate config.plugins by requiring optional files
  await populatePlugins(mergedConfig);

  // create the express or uws server inside a wrapper
  const server: Server = await createServer(mergedConfig);

  // extend with resulting config
  server.config = mergedConfig;

  // spread
  const { folder, maxCacheSize, type, port, plugins, ssl } = server.config;

  // create the static files reader based on folder
  const fileReader: FileReader = createFileReader(folder);

  // and create a cache for above
  const fileReaderCache: FileReaderCache = maxCacheSize
    ? new Cache(fileReader, maxCacheSize)
    : { get: fileReader };

  // give library consumer one frame to setup his own routes
  setTimeout(() => {
    // everything goes to the reader
    server.get("/*", requestHandler(fileReaderCache));
  });

  // make server listen on process.env.PORT || 4200
  await server.start(port);

  // mandatory started message
  console.info(`Started ${type} ${ssl ? "https" : "http"} app on port`, port);

  if (Object.keys(plugins).length) {
    console.info("with plugin(s)", Object.keys(plugins).join(", "));
  }

  // finally
  return server;
}
