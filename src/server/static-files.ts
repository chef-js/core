import { join } from "path";
import { lookup } from "mime-types";
import { existsSync, lstatSync, readFileSync } from "fs";
import { FileReaderResponse } from "../types";

export default function createFileReader(
  folder: string = ""
): (url: string) => FileReaderResponse {
  // get main index
  const index: string | null = folder
    ? readFileSync(join(folder, "index.html"), { encoding: "utf8" })
    : "";

  // this is used as file reader cache
  return function fileReader(url: string): FileReaderResponse {
    const mime: string = lookup(url) || "application/octet-stream";
    const filename: string = join(folder, url);

    if (!existsSync(filename)) {
      return { mime: "text/html", body: index, status: 200 };
    }

    if (lstatSync(filename).isDirectory()) {
      return fileReader(`${url}/index.html`);
    }

    return { mime, body: readFileSync(filename), status: 200 };
  };
}
