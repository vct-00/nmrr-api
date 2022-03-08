"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const authController_1 = __importDefault(require("../controllers/authController"));
const router = express_1.default.Router();
//Add admin user
router.post("/", authController_1.default.authorizeToken, userController_1.default.addUser);
module.exports = router;
