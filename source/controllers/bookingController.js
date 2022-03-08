"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const booking_1 = __importDefault(require("../models/schema/booking"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//retrieve booking details by booking ID
const getBookingById = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const booking = yield booking_1.default.findById(req.params.id);
      if (booking === null) throw Error("Booking does not exist.");
      else res.status(200).json({ booking });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });
//retrieve all bookings of room by room ID
const getBookingByRoomId = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      res
        .status(200)
        .json(yield booking_1.default.find({ roomId: req.params.roomId }));
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });
//validate and save meeting room booking
const addBooking = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const booking = new booking_1.default({
      roomId: req.body.roomId,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      notes: req.body.notes,
    });
    try {
      //get user full name and id from token to include in booking
      const decoded = decodeToken(req);
      booking.name = decoded.firstName + " " + decoded.lastName;
      booking.userId = decoded._id;
      //validate start & end time
      if (booking.endDate < booking.startDate) throw Error("Time invalid");
      //check if room schedule is available
      let conflictBookings = (yield booking_1.default.find({
        roomId: booking.roomId,
      })).filter(
        (x) =>
          (x.startDate <= booking.startDate &&
            x.endDate >= booking.startDate) ||
          (x.startDate <= booking.endDate && x.endDate >= booking.endDate)
      );
      if (conflictBookings.length != 0)
        throw Error("Room Schedule unavailable.");
      //check if room schedule is available
      conflictBookings = (yield booking_1.default.find({
        userId: booking.userId,
      })).filter(
        (x) =>
          (x.startDate <= booking.startDate &&
            x.endDate >= booking.startDate) ||
          (x.startDate <= booking.endDate && x.endDate >= booking.endDate)
      );
      if (conflictBookings.length != 0)
        throw Error("User Schedule unavailable.");
      //try saving
      res.status(201).json(yield booking.save());
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
//retrieve all bookings of user by user ID
const getBookingByUserId = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const decoded = decodeToken(req);
      if (decoded._id != req.params.id) throw Error("Invalid access.");
      res
        .status(200)
        .json(yield booking_1.default.find({ userId: decoded._id }));
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });
const decodeToken = (req) => {
  const authHeader = req.headers[`authorization`];
  const token =
    authHeader &&
    (authHeader === null || authHeader === void 0
      ? void 0
      : authHeader.split(" ")[1]);
  return jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
};
exports.default = {
  getBookingById,
  getBookingByRoomId,
  addBooking,
  getBookingByUserId,
};
