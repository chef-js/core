"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParam = void 0;
function getParam(find, fallback) {
  const matches = process.argv.join(" ").match(new RegExp(`--${find} ([^ ]+)`));
  return matches ? matches[1] : fallback;
}
exports.getParam = getParam;
