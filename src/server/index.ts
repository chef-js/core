import Cache from "../cache";
import createFileReader from "./static-files.js";
import { WSConfig, WSFileReaderResponse, WSServer } from "../types.js";
import { populatePlugins } from "../plugins";
import baseConfig from "../config.js";

export default async function startServer(
  userConfig: WSConfig,
  {
    createServer,
    requestHandler,
  }: {
    createServer: (config: WSConfig) => Promise<any>;
    requestHandler: (
      fileReaderCache: Cache
    ) => (res: any, req: any, next?: any) => void;
  }
): Promise<WSServer> {
  const config: WSConfig = { ...baseConfig, ...userConfig };

  await populatePlugins(config);

  // create the express or uws server inside a wrapper
  const server: any = await createServer(config);

  // create the static files reader based on folder
  const fileReader: (url: string) => WSFileReaderResponse = createFileReader(
    config.folder
  );

  // and create a cache for above
  const fileReaderCache: Cache = new Cache(fileReader);

  // everything goes to the reader
  server.get("/*", requestHandler(fileReaderCache));

  // finally start the server on process.env.PORT || 4200
  await server.listen(config.port);

  return server;
}
