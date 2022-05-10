import { join } from "path";
import { lookup } from "mime-types";
import { existsSync, lstatSync, readFileSync } from "fs";
import { WSFileReaderResponse } from "../types";

export default function createFileReader(
  folder: string = ""
): (url: string) => WSFileReaderResponse {
  // get main index
  const index: string | null = folder
    ? readFileSync(join(folder, "index.html"), { encoding: "utf8" })
    : "";

  // this is used as file reader cache
  return function fileReader(url: string): WSFileReaderResponse {
    const mime: string = lookup(url) || "application/octet-stream";
    const filename: string = join(folder, url);

    if (!existsSync(filename) || lstatSync(filename).isDirectory()) {
      return { mime: "text/html", body: index, status: 301 };
    }

    return { mime, body: readFileSync(filename), status: 200 };
  };
}
