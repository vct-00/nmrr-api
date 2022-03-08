"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
const express_1 = __importDefault(require("express"));
const roomController_1 = __importDefault(
  require("../controllers/roomController")
);
const authController_1 = __importDefault(
  require("../controllers/authController")
);
const router = express_1.default.Router();
//Get all meeting rooms
router.get("/", roomController_1.default.getAllRooms);
//Add meeting room
router.post(
  "/",
  authController_1.default.authorizeToken,
  roomController_1.default.addRoom
);
//Get room details by Room ID
router.get(
  "/:id",
  roomController_1.default.validateRoomExists,
  roomController_1.default.getRoomById
);
module.exports = router;
