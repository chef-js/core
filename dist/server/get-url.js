"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getUrl;
function getUrl(url) {
  return decodeURIComponent(
    url.replace(/^\/+/, "").split("?")[0].split("#")[0],
  );
}
