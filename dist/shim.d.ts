import { WSEvent, WSPlugin, WSServer, WSSocket } from "./types";
/**
 * @param {string} name
 * @param {object} plugin = { initialize, handshake }
 * @returns {WSPlugin}
 */
export default function shim(name: string, plugin: {
    initialize: (server: WSServer) => void;
    handshake: (ws: WSSocket, event: WSEvent) => void;
    initialized?: boolean;
}): WSPlugin;
//# sourceMappingURL=shim.d.ts.map