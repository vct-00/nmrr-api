import express from "express";
import controller from "../controllers/authController";
const router = express.Router();

//login: authenticate and authorize user
router.post("/login", controller.logIn);

//logout: revoke access token
router.delete("/logout", controller.revokeAccessToken);

export = router;
