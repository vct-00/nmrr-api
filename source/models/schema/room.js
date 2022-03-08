"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const RoomSchema = new mongoose_1.default.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Number,
    required: true,
    default: Date.now,
  },
  dateUpdated: {
    type: Number,
    required: true,
    default: Date.now,
  },
});
const Room = mongoose_1.default.model("Room", RoomSchema);
module.exports = Room;
exports.default = Room;
