"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const BookingSchema = new mongoose_1.default.Schema({
    roomId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    startDate: {
        type: Number,
        required: true,
        default: Date.now,
    },
    endDate: {
        type: Number,
        required: true,
        default: Date.now,
    },
    name: {
        type: String,
        required: true,
    },
    notes: {
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
const Booking = mongoose_1.default.model("Booking", BookingSchema);
module.exports = Booking;
exports.default = Booking;
