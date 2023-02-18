import { Cache } from "latermom";
import { WSConfig, WSRequest, WSServer } from "../types.js";
/**
 * this is either
 * @param {object} config
 * @param {object} core_consumer
 * @returns {WSServer}
 */
export default function startServer(
  config: WSConfig,
  {
    createServer,
    requestHandler,
  }: {
    createServer(config: WSConfig): Promise<WSServer>;
    requestHandler(fileReaderCache: Cache): WSRequest;
  }
): Promise<WSServer>;
//# sourceMappingURL=index.d.ts.map
