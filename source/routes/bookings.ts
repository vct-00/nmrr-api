import express from "express";
import controller from "../controllers/bookingController";
import roomController from "../controllers/roomController";
const router = express.Router();

//Get booking details by Booking ID
router.get("/:id", controller.getBookingById);

//Get all room bookings by Room ID
router.get(
  "/room/:roomId",
  roomController.validateRoomExists,
  controller.getBookingByRoomId
);

//Add room booking
router.post("/", roomController.validateRoomExists, controller.addBooking);

export = router;
