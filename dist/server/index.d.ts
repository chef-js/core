import { WSConfig, WSServer, WSCoreConsumer } from "../types.js";
/**
 * this is either
 * @param {WSConfig} config
 * @param {WSCoreConsumer} coreConsumer
 * @returns {WSServer}
 */
export declare function chef(
  config: WSConfig,
  { createServer, requestHandler }: WSCoreConsumer
): Promise<WSServer>;
//# sourceMappingURL=index.d.ts.map
