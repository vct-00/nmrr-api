"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TokenSchema = new mongoose_1.default.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
});
const Token = mongoose_1.default.model("Token", TokenSchema);
module.exports = Token;
exports.default = Token;
