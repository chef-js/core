import { FileReader, FileReaderResponse } from "../types";
import { existsSync, lstatSync, readFileSync } from "fs";

import config from "../config";
import { join } from "path";
import { lookup } from "mime-types";

const readFile = (folder: string, filename = "index.html") => {
  try {
    const path = join(folder, filename);

    return readFileSync(path, { encoding: "utf8" }) || "";
  } catch (_err) {
    return "";
  }
};

const getMimeFromURL = (url: string) =>
  lookup(url) || "application/octet-stream";

export default function createFileReader(folder: string): FileReader {
  // get main index
  const indexHTML = readFile(folder);

  // this is used as file reader cache
  return function fileReader(url: string): FileReaderResponse {
    const mime = getMimeFromURL(url);
    const filename = join(folder, url);

    if (!existsSync(filename)) {
      return { mime: "text/html", body: indexHTML, status: 200 };
    }

    if (lstatSync(filename).isDirectory()) {
      return fileReader(`${url}/index.html`);
    }

    if (config.spa) {
      const body = readFileSync(filename);

      return { mime, body, status: 200 };
    } else {
      return null;
    }
  };
}
