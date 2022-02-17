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
): WSPlugin {
  const object = {
    // this js hack sets function name
    [name]: function (ws: any, { id, event, data }: WSEvent) {
      // once per plugin
      if (!plugin.initialized) {
        plugin.initialized = true;

        if (plugin.initialize) {
          plugin.initialize.call(this, this);
        }
      }

      // once per socket
      if (!ws.handshaken) {
        ws.handshaken = true;

        if (!ws.on) {
          ws.on = (event: string, callback: WSPlugin) => {
            if (!ws.events[event]) {
              ws.events[event] = [];
            }

            ws.events[event].push(callback);
          };
        }

        if (!ws.emit) {
          ws.emit = (event: string, data: any) => {
            ws.send(JSON.stringify({ id, event, data }));
          };
        }

        if (plugin.handshake) {
          plugin.handshake.call(this, ws, { id, event, data });
        }
      }

      const callbacks: WSPlugin[] | undefined = ws.events[event];

      if (callbacks) {
        callbacks.forEach((callback: WSPlugin) =>
          callback.call(this, ws, { id, event, data })
        );
      }
    },
  };

  return object[name];
}
