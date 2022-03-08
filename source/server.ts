import express, { Express } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import roomRouter from "./routes/rooms";
import bookingRouter from "./routes/bookings";
import authRouter from "./routes/auth";
import userRouter from "./routes/users";

const app: Express = express();

dotenv.config();
mongoose.connect(process.env.DATABASE_URL as string);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

/** Parse the request */
app.use(express.urlencoded({ extended: false }));

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
app.use(express.json());

/** Routes */
app.use("/rooms", roomRouter);
app.use("/bookings", bookingRouter);
app.use("/users", userRouter);
app.use("/", authRouter);

/** Server */
app.listen(process.env.PORT || 3000, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
