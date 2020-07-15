const { existsSync, mkdirSync } = require("fs");
function validatePath(path = "") {
  if (!existsSync(path)) mkdirSync(path);
}
exports.validatePath = validatePath;
