import { Request, Response, NextFunction } from "express";
import BookingSchema from "../models/schema/booking";
import Room from "../models/schema/room";

const getBookingById = async (req: Request, res: Response) => {
  try {
    const booking = await BookingSchema.findById(req.params.id);
    if (booking == null)
      return res.status(404).json({ message: "Booking does not exist." });
    else res.send({ booking, status: 200 });
  } catch (err) {
    return res.status(500).json({ message: "Failed" });
  }
};

const getBookingByRoomId = async (req: Request, res: Response) => {
  try {
    console.log(req.params);
    const room = await Room.findById(req.params.roomId);
    if (room == null)
      return res.status(404).json({ message: "Room not found." });

    const booking = await BookingSchema.find({ roomId: req.params.roomId });
    if (booking == null)
      return res.status(404).json({ message: "Room bookings not found." });

    res.send({ booking, status: 200 });
  } catch (err) {
    return res.status(500).json({ message: "Failed" });
  }
};

const addBooking = async (req: Request, res: Response) => {
  const booking = new BookingSchema({
    roomId: req.body.roomId,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    name: req.body.name,
    notes: req.body.notes,
    dateCreated: req.body.dateCreated,
    dateUpdated: req.body.dateUpdated,
  });

  try {
    const newBooking = await booking.save();
    res.send({ newBooking, status: 201 });
  } catch (err) {
    res.status(400).json({ message: "Failed" });
  }
};

export default { getBookingById, getBookingByRoomId, addBooking };
