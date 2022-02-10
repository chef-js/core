"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getUrl(url) {
    return decodeURIComponent(url.replace(/^\/+/, "").split("?")[0].split("#")[0]);
}
exports.default = getUrl;
