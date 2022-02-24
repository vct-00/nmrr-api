import express from "express";
import controller from "../controllers/roomController";
import authController from "../controllers/authController";
const router = express.Router();

router.get("/", controller.getAllRooms);
router.post("/", authController.authenticateToken, controller.addRoom);
router.get("/:id", authController.authenticateToken, controller.getRoomById);

export = router;
