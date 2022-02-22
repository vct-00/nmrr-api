import express from "express";
import controller from "../controllers/userController";
const router = express.Router();

router.post("/login", controller.logIn);
router.post("/", controller.addUser);

export = router;
