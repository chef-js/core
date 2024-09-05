"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.populatePlugins = populatePlugins;
exports.getPlugin = getPlugin;
const path_1 = require("path");
async function populatePlugins(config) {
  // get plugins from bash regex
  const matches = process.argv.join(" ").match(/--plugin [^ ]+/);
  if (matches) {
    // we need to get our promises in order
    const syncMap = matches.map((path) => {
      const [_, plugin] = path.split(" ");
      return import((0, path_1.resolve)(plugin));
    });
    // so the main function awaits properly
    const plugins = await Promise.all(syncMap);
    plugins.forEach(({ default: plugin }) => {
      // populate plugins
      config.plugins[plugin.name] = plugin;
    });
  }
}
function getPlugin(config, topic) {
  // check if we have such plugin
  return config.plugins[topic];
}
