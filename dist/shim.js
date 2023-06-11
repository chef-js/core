"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @param {string} name
 * @param {object} plugin = { initialize, handshake }
 * @returns {Plugin}
 */
function shim(name, plugin) {
  // this js hack sets function name
  const object = {
    [name]: function (ws, { id, event, data }) {
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
          ws.on = (event, callback) => {
            if (!ws.events[event]) {
              ws.events[event] = [];
            }
            ws.events[event].push(callback);
          };
        }
        if (!ws.emit) {
          ws.emit = (event, data) => {
            ws.send(JSON.stringify({ id, event, data }));
          };
        }
        if (plugin.handshake) {
          plugin.handshake.call(this, ws, { id, event, data });
        }
      }
      const callbacks = ws.events && ws.events[event];
      if (callbacks) {
        callbacks.forEach((callback) =>
          callback.call(this, { id, event, data })
        );
      }
    },
  };
  return object[name];
}
exports.default = shim;
