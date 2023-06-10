import { Cache } from "latermom";
import baseConfig from "../config.js";
import createFileReader from "./static-files.js";
import {
  WSConfig,
  WSFileReader,
  WSFileReaderCache,
  WSServer,
  WSCoreConsumer,
} from "../types.js";
import { populatePlugins } from "../plugins";

/**
 * this is either
 * @param {WSConfig} config
 * @param {WSCoreConsumer} coreConsumer
 * @returns {WSServer}
 */
export async function chef(
  config: Partial<WSConfig>,
  { createServer, requestHandler }: WSCoreConsumer
): Promise<WSServer> {
  const mergedConfig: WSConfig = { ...baseConfig, ...config };

  // polulate config.plugins by requiring optional files
  await populatePlugins(mergedConfig);

  // create the express or uws server inside a wrapper
  const server: WSServer = await createServer(mergedConfig);

  // extend with resulting config
  server.config = mergedConfig;

  // spread
  const { folder, maxCacheSize, type, port, plugins } = server.config;

  // create the static files reader based on folder
  const fileReader: WSFileReader = createFileReader(folder);

  // and create a cache for above
  const fileReaderCache: WSFileReaderCache = maxCacheSize
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
  console.info(`Started ${type} app on port`, port);

  if (Object.keys(plugins).length) {
    console.info("with plugin(s)", Object.keys(plugins).join(", "));
  }

  // finally
  return server;
}
