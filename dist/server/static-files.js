"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const mime_types_1 = require("mime-types");
const fs_1 = require("fs");
function createFileReader(folder = "") {
  // get main index
  const index = folder
    ? (0, fs_1.readFileSync)((0, path_1.join)(folder, "index.html"), {
        encoding: "utf8",
      })
    : "";
  // this is used as file reader cache
  return function fileReader(url) {
    const mime = (0, mime_types_1.lookup)(url) || "application/octet-stream";
    const filename = (0, path_1.join)(folder, url);
    if (!(0, fs_1.existsSync)(filename)) {
      return { mime: "text/html", body: index, status: 200 };
    }
    if ((0, fs_1.lstatSync)(filename).isDirectory()) {
      return fileReader(`${url}/index.html`);
    }
    return { mime, body: (0, fs_1.readFileSync)(filename), status: 200 };
  };
}
exports.default = createFileReader;
