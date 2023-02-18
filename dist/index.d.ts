import { Cache } from "latermom";
import { WSConfig, WSRequest, WSServer } from "./types.js";
export default function startServer(
  userConfig: Partial<WSConfig>,
  {
    createServer,
    requestHandler,
  }: {
    createServer: (config: WSConfig) => Promise<WSServer>;
    requestHandler: (fileReaderCache: Cache) => WSRequest;
  }
): Promise<WSServer>;
//# sourceMappingURL=index.d.ts.map
