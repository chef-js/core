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
const readFile = (path) => {
  try {
    return (0, fs_1.readFileSync)(path, { encoding: "utf8" }) || "";
  } catch (_err) {
    return "<html></html>";
  }
};
const getMimeFromURL = (url) =>
  (0, mime_types_1.lookup)(url) || "application/octet-stream";
function createFileReader(folder) {
  // get main index
  const indexURL = "index.html";
  const indexHTML = readFile((0, path_1.join)(folder, indexURL));
  // this is used as file reader cache
  return function fileReader(inputURL) {
    const url = inputURL || indexURL;
    const mime = getMimeFromURL(url);
    const filename = (0, path_1.join)(folder, url);
    if (config_1.default.debug) {
      console.log(filename);
    }
    if (!(0, fs_1.existsSync)(filename)) {
      if (config_1.default.spa) {
        return { mime: "text/html", body: indexHTML, status: 200 };
      } else {
        return { mime: "text/plain", body: "", status: 404 };
      }
    }
    if ((0, fs_1.lstatSync)(filename).isDirectory()) {
      return fileReader(`${url}/index.html`);
    }
    return { mime, body: readFile(filename), status: 200 };
  };
}
