import Cache from "../cache";
import { WSConfig, WSServer } from "../types.js";
export default function startServer(
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
): Promise<WSServer>;
//# sourceMappingURL=index.d.ts.map
