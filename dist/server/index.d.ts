import { Config, CoreConsumer, Server } from "../types.js";
/**
 * this is either
 * @param {Config} inputConfig
 * @param {CoreConsumer} coreConsumer
 * @returns {Server}
 */
export default function cook(
  inputConfig: Partial<Config>,
  { createServer, requestHandler }: CoreConsumer,
): Promise<Server>;
//# sourceMappingURL=index.d.ts.map
