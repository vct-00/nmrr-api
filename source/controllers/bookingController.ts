import { Request, Response, NextFunction } from "express";
import BookingSchema from "../models/schema/booking";

//retrieve booking details by booking ID
const getBookingById = async (req: Request, res: Response) => {
  try {
    const booking = await BookingSchema.findById(req.params.id);

    if (booking == null) throw Error("Booking does not exist.");
    else res.status(200).json({ booking });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

//retrieve all bookings of room by room ID
const getBookingByRoomId = async (req: Request, res: Response) => {
  try {
    res
      .status(200)
      .json(await BookingSchema.find({ roomId: req.params.roomId }));
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

//validate and save meeting room booking
const addBooking = async (req: Request, res: Response) => {
  const booking = new BookingSchema({
    roomId: req.body.roomId,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    name: req.body.name,
    notes: req.body.notes,
  });

  try {
    //validate start & end time
    if (booking.endDate < booking.startDate) throw Error("Time invalid");

    //check if time is available
    let conflictBookings = (
      await BookingSchema.find({ roomId: booking.roomId })
    ).filter(
      (x) =>
        (x.startDate <= booking.startDate && x.endDate >= booking.startDate) ||
        (x.startDate <= booking.endDate && x.endDate >= booking.endDate)
    );
    if (conflictBookings.length != 0) throw Error("Time unvailable");

    //try saving
    res.status(201).json(await booking.save());
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export default {
  getBookingById,
  getBookingByRoomId,
  addBooking,
};
