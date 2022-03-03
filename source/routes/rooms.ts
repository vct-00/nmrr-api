import express from "express";
import controller from "../controllers/roomController";
import authController from "../controllers/authController";
const router = express.Router();

//Get all meeting rooms
router.get("/", controller.getAllRooms);

//Add meeting room
router.post("/", authController.authorizeToken, controller.addRoom);

//Get room details by Room ID
router.get("/:id", controller.validateRoomExists, controller.getRoomById);

export = router;
