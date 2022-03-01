import { Request, Response, NextFunction } from "express";
import Room from "../models/schema/room";

//retrieve all meeting rooms
const getAllRooms = async (req: Request, res: Response) => {
  try {
    res.status(200).json(await Room.find());
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

//add new meeting room
const addRoom = async (req: Request, res: Response) => {
  const room = new Room({
    name: req.body.name,
    description: req.body.description,
  });

  try {
    res.status(201).json(await room.save());
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

//get room detail by room ID
const getRoomById = async (req: Request, res: Response) => {
  try {
    const room = await Room.findById(req.params.id);

    res.send({ room, status: 200 });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

//middleware: validate if meeting room exists by ID
const validateRoomExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (
      (await Room.findById(
        req.params.roomId || req.body.roomId || req.params.id
      )) == null
    )
      throw Error("Room not found.");
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }

  next();
};
export default { getAllRooms, addRoom, getRoomById, validateRoomExists };
