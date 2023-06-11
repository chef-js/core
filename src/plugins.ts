import { resolve } from "path";
import { Config, Plugin } from "./types.js";

export async function populatePlugins(config: Config): Promise<void> {
  // get plugins from bash regex
  const matches: RegExpMatchArray | null = process.argv
    .join(" ")
    .match(/--plugin [^ ]+/);

  if (matches) {
    // we need to get our promises in order
    const syncMap: Promise<{ default: Plugin }>[] = matches.map(
      (path: string) => {
        const [_, plugin] = path.split(" ");

        return import(resolve(plugin));
      }
    );

    // so the main function awaits properly
    const plugins: { default: Plugin }[] = await Promise.all(syncMap);

    plugins.forEach(({ default: plugin }: { default: Plugin }) => {
      // populate plugins
      config.plugins[plugin.name] = plugin;
    });
  }
}

export function getPlugin(config: Config, topic: string): Plugin | undefined {
  // check if we have such plugin
  return config.plugins[topic];
}
