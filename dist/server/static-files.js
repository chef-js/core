"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createFileReader;
const fs_1 = require("fs");
const config_1 = __importDefault(require("../config"));
const path_1 = require("path");
const mime_types_1 = require("mime-types");
const readFile = (folder, filename = "index.html") => {
  try {
    const path = (0, path_1.join)(folder, filename);
    return (0, fs_1.readFileSync)(path, { encoding: "utf8" }) || "";
  } catch (_err) {
    return "";
  }
};
const getMimeFromURL = (url) =>
  (0, mime_types_1.lookup)(url) || "application/octet-stream";
function createFileReader(folder) {
  // get main index
  const indexHTML = readFile(folder);
  // this is used as file reader cache
  return function fileReader(url) {
    const mime = getMimeFromURL(url);
    const filename = (0, path_1.join)(folder, url);
    if (!(0, fs_1.existsSync)(filename)) {
      return { mime: "text/html", body: indexHTML, status: 200 };
    }
    if ((0, fs_1.lstatSync)(filename).isDirectory()) {
      return fileReader(`${url}/index.html`);
    }
    if (config_1.default.spa) {
      const body = (0, fs_1.readFileSync)(filename);
      return { mime, body, status: 200 };
    } else {
      return null;
    }
  };
}
