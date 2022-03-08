"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    password: {
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
const User = mongoose_1.default.model("User", UserSchema);
module.exports = User;
exports.default = User;
