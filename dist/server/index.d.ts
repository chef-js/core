import Cache from "../cache";
import { WSConfig, WSServer } from "../types.js";
export default function startServer(
  config: WSConfig,
  {
    createServer,
    requestHandler,
  }: {
    createServer: (config: WSConfig) => Promise<WSServer>;
    requestHandler: (
      fileReaderCache: Cache
    ) => (res: any, req: any, next?: any) => void;
  }
): Promise<WSServer>;
//# sourceMappingURL=index.d.ts.map
