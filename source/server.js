"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const rooms_1 = __importDefault(require("./routes/rooms"));
const bookings_1 = __importDefault(require("./routes/bookings"));
const auth_1 = __importDefault(require("./routes/auth"));
const users_1 = __importDefault(require("./routes/users"));
const app = (0, express_1.default)();
dotenv_1.default.config();
mongoose_1.default.connect(process.env.DATABASE_URL);
const db = mongoose_1.default.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));
/** Parse the request */
app.use(express_1.default.urlencoded({ extended: false }));
/** API RULES */
app.use((req, res, next) => {
  // set the CORS policy
  res.header("Access-Control-Allow-Origin", "*");
  // set the CORS headers
  res.header(
    "Access-Control-Allow-Headers",
    "origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  // set the CORS method headers
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, PATCH, DELETE, POST");
    return res.status(200).json({});
  }
  next();
});
/** Takes care of JSON data */
app.use(express_1.default.json());
/** Routes */
app.use("/rooms", rooms_1.default);
app.use("/bookings", bookings_1.default);
app.use("/users", users_1.default);
app.use("/", auth_1.default);
/** Server */
app.listen(process.env.PORT || 3000, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
