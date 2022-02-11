import Cache from "./cache";
import baseConfig from "./config.js";
import wrapServer from "./server";
import { WSConfig, WSServer } from "./types.js";

// dynamically start server
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
  // merge configurations
  const config: WSConfig = { ...baseConfig, ...userConfig };
  // dynamically create wrapped compatible express or uws server
  const server: WSServer = await wrapServer(config, {
    createServer,
    requestHandler,
  });

  // mandatory started message
  console.info(`Started ${config.type} app on port`, config.port);

  if (Object.keys(config.plugins).length) {
    console.info("with plugin(s)", Object.keys(config.plugins).join(", "));
  }

  // resolve with server
  return server;
}
