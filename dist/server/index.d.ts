import { Config, CoreConsumer, Server } from "../types.js";
/**
 * this is either
 * @param {Config} config
 * @param {CoreConsumer} coreConsumer
 * @returns {Server}
 */
export declare function chef(
  config: Partial<Config>,
  { createServer, requestHandler }: CoreConsumer,
): Promise<Server>;
//# sourceMappingURL=index.d.ts.map
