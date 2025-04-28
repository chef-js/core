import { FileReader, FileReaderResponse } from "../types";
import { existsSync, lstatSync, readFileSync } from "fs";

import config from "../config";
import { join } from "path";
import { lookup } from "mime-types";

const readFile = (path: string) => {
  try {
    return readFileSync(path, { encoding: "utf8" }) || "";
  } catch (_err) {
    return "<html></html>";
  }
};

const getMimeFromURL = (url: string) =>
  lookup(url) || "application/octet-stream";

export default function createFileReader(folder: string): FileReader {
  // get main index
  const indexURL = "index.html";
  const indexHTML = readFile(join(folder, indexURL));

  // this is used as file reader cache
  return function fileReader(inputURL: string): FileReaderResponse {
    const url = inputURL || indexURL;
    const mime = getMimeFromURL(url);
    const filename = join(folder, url);

    if (config.debug) {
      console.log(filename);
    }

    if (!existsSync(filename)) {
      if (config.spa) {
        return { mime: "text/html", body: indexHTML, status: 200 };
      } else {
        return { mime: "text/plain", body: "", status: 404 };
      }
    }

    if (lstatSync(filename).isDirectory()) {
      return fileReader(`${url}/index.html`);
    }

    return { mime, body: readFile(filename), status: 200 };
  };
}
