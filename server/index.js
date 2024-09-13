import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import route from "./route/route.js";
import mongoose from "mongoose";
import session from "express-session";

const app = express();

//* Configuration of environment variables
dotenv.config();

//* Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

//* Routes
app.use("/user", route);

//* Database connection.
mongoose
  .connect(process.env.DB)
  .then(console.log("Database connected successfully!"))
  .catch((error) => response.error(error, "Error while connecting to databse."));

//* Listening to server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
