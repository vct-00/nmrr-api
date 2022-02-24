import express from "express";
import controller from "../controllers/userController";
import authController from "../controllers/authController";
const router = express.Router();

router.post("/", controller.addUser);

export = router;
