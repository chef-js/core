import { Event, Plugin, Server, Socket } from "./types";
/**
 * @param {string} name
 * @param {object} plugin = { initialize, handshake }
 * @returns {Plugin}
 */
export default function shim(
  name: string,
  plugin: {
    initialize: (server: Server) => void;
    handshake: (ws: Socket, event: Event) => void;
    initialized?: boolean;
  }
): Plugin;
//# sourceMappingURL=shim.d.ts.map
