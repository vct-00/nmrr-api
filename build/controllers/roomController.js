"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const room_1 = __importDefault(require("../models/schema/room"));
//retrieve all meeting rooms
const getAllRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json(yield room_1.default.find());
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
//add new meeting room
const addRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const room = new room_1.default({
        name: req.body.name,
        description: req.body.description,
    });
    try {
        res.status(201).json(yield room.save());
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
//get room detail by room ID
const getRoomById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const room = yield room_1.default.findById(req.params.id);
        res.send({ room, status: 200 });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
//middleware: validate if meeting room exists by ID
const validateRoomExists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if ((yield room_1.default.findById(req.params.roomId || req.body.roomId || req.params.id)) === null)
            throw Error("Room not found.");
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
    next();
});
exports.default = { getAllRooms, addRoom, getRoomById, validateRoomExists };
