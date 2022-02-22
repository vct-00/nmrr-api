import { Request, Response, NextFunction } from "express";
import Room from "../models/schema/room";

const getAllRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await Room.find();
    return res.send({ rooms });
  } catch (err) {
    return res.send({ message: "Failed" });
  }
};

const addRoom = async (req: Request, res: Response) => {
  const room = new Room({
    name: req.body.name,
    description: req.body.description,
  });
  try {
    const newRoom = await room.save();
    res.send({ newRoom, status: 201 });
  } catch (err) {
    res.status(400).json({ message: "Failed" });
  }
};

const getRoomById = async (req: Request, res: Response) => {
  let room;
  try {
    room = await Room.findById(req.params.id);
    if (room == null)
      return res.status(404).json({ message: "Cannot find room" });
  } catch (err) {
    return res.status(500).json({ message: "Failed" });
  }
  res.send({ room, status: 200 });
};

export default { getAllRooms, addRoom, getRoomById };
