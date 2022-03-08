import { Request, Response, NextFunction } from "express";
import BookingSchema from "../models/schema/booking";
import jwt, { decode } from "jsonwebtoken";

//retrieve booking details by booking ID
const getBookingById = async (req: Request, res: Response) => {
  try {
    const booking = await BookingSchema.findById(req.params.id);

    if (booking === null) throw Error("Booking does not exist.");
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
    notes: req.body.notes,
  });

  try {
    //get user full name and id from token to include in booking
    const decoded: any = decodeToken(req);

    booking.name = decoded.firstName + " " + decoded.lastName;
    booking.userId = decoded._id;

    //validate start & end time
    if (booking.endDate < booking.startDate) throw Error("Time invalid");

    //check if room schedule is available
    let conflictBookings = (
      await BookingSchema.find({ roomId: booking.roomId })
    ).filter(
      (x) =>
        (x.startDate <= booking.startDate && x.endDate >= booking.startDate) ||
        (x.startDate <= booking.endDate && x.endDate >= booking.endDate)
    );
    if (conflictBookings.length != 0) throw Error("Room Schedule unavailable.");

    //check if room schedule is available
    conflictBookings = (
      await BookingSchema.find({ userId: booking.userId })
    ).filter(
      (x) =>
        (x.startDate <= booking.startDate && x.endDate >= booking.startDate) ||
        (x.startDate <= booking.endDate && x.endDate >= booking.endDate)
    );
    if (conflictBookings.length != 0) throw Error("User Schedule unavailable.");

    //try saving
    res.status(201).json(await booking.save());
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

//retrieve all bookings of user by user ID
const getBookingByUserId = async (req: Request, res: Response) => {
  try {
    const decoded: any = decodeToken(req);
    if (decoded._id != req.params.id) throw Error("Invalid access.");

    res.status(200).json(await BookingSchema.find({ userId: decoded._id }));
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

const decodeToken = (req) => {
  const authHeader = req.headers[`authorization`];
  const token = authHeader && authHeader?.split(" ")[1];
  return jwt.verify(token as string, process.env.ACCESS_TOKEN_SECRET as string);
};

export default {
  getBookingById,
  getBookingByRoomId,
  addBooking,
  getBookingByUserId,
};
