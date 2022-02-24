import express from "express";
import controller from "../controllers/authController";
const router = express.Router();

//get new access token
router.post("/", controller.getNewAccessToken);

//logout: revoke refresh token
router.delete("/logout", controller.revokeRefreshToken);

//logout: revoke refresh token
router.post("/login", controller.logIn);

export = router;
