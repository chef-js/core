import Cache from "../cache";
import createFileReader from "./static-files.js";
import {
  WSConfig,
  WSFileReaderResponse,
  WSRequest,
  WSServer,
} from "../types.js";
import { populatePlugins } from "../plugins";

/**
 * this is either
 * @param {object} config
 * @param {object} core_consumer
 * @returns {WSServer}
 */
export default async function startServer(
  config: WSConfig,
  {
    createServer,
    requestHandler,
  }: {
    createServer(config: WSConfig): Promise<WSServer>;
    requestHandler(fileReaderCache: Cache): WSRequest;
  }
): Promise<WSServer> {
  // polulate config.plugins by requiring optional files
  await populatePlugins(config);

  // create the express or uws server inside a wrapper
  const server: WSServer = await createServer(config);

  // extend with resulting config
  server.config = config;

  // create the static files reader based on folder
  const fileReader: (url: string) => WSFileReaderResponse = createFileReader(
    config.folder
  );

  // and create a cache for above
  const fileReaderCache: Cache = new Cache(fileReader);

  // give library consumer one frame to setup his own routes
  setTimeout(() => {
    // everything goes to the reader
    server.get("/*", requestHandler(fileReaderCache));
  });

  // make server listen on process.env.PORT || 4200
  await server.start(config.port);

  // finally
  return server;
}
