"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(
  require("../controllers/authController")
);
const router = express_1.default.Router();
//login: authenticate and authorize user
router.post("/login", authController_1.default.logIn);
//logout: revoke access token
router.delete("/logout", authController_1.default.revokeAccessToken);
module.exports = router;
