"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../controllers/authController"));
const bookingController_1 = __importDefault(require("../controllers/bookingController"));
const roomController_1 = __importDefault(require("../controllers/roomController"));
const router = express_1.default.Router();
//Get booking details by Booking ID
router.get("/:id", bookingController_1.default.getBookingById);
//Get all user bookings by User ID
router.get("/user/:id", authController_1.default.authorizeToken, bookingController_1.default.getBookingByUserId);
//Get all room bookings by Room ID
router.get("/room/:roomId", roomController_1.default.validateRoomExists, bookingController_1.default.getBookingByRoomId);
//Add room booking
router.post("/", authController_1.default.authorizeToken, roomController_1.default.validateRoomExists, bookingController_1.default.addBooking);
module.exports = router;
