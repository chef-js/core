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
): Plugin {
  // this js hack sets function name
  const object = {
    [name]: function (
      ws: Socket & { [prop: string]: any },
      { id, event, data }: Event
    ) {
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
          ws.events = {};

          ws.on = (event: string, callback: Plugin) => {
            if (!ws.events[event]) {
              ws.events[event] = [];
            }

            ws.events[event].push(callback);
          };
        }

        if (!ws.emit) {
          ws.emit = (event: string, data?: any) => {
            ws.send(JSON.stringify({ id, event, data }));
          };
        }

        if (plugin.handshake) {
          plugin.handshake.call(this, ws, { id, event, data });
        }
      }

      const callbacks: Plugin[] | undefined = ws.events && ws.events[event];

      if (callbacks) {
        callbacks.forEach((callback: Plugin) =>
          callback.call(this, { id, event, data })
        );
      }
    },
  };

  return object[name];
}
