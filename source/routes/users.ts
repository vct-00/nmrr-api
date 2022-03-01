import express from "express";
import controller from "../controllers/userController";
import authController from "../controllers/authController";
const router = express.Router();

//Add admin user
router.post("/", authController.authorizeToken, controller.addUser);

export = router;
