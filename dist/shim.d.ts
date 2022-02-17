import { WSEvent, WSPlugin } from "./types";
/**
 * @param {string} name
 * @param {object} plugin = { initialize, handshake }
 * @returns {function}
 */
export default function shim(
  name: string,
  plugin: {
    initialize: (server: any) => void;
    handshake: (ws: any, event: WSEvent) => void;
    initialized?: boolean;
  }
): WSPlugin;
//# sourceMappingURL=shim.d.ts.map
