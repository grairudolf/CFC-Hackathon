import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PORT, DB_URI } from "./config/env.js";
import userRouter from "./routes/user.routes.js";
import connectDB from "./database/db.js";
import errorMiddleware from "./middlewares/error.middleware.js";

dotenv.config();
const app = express();

// Setting up middlewares
app.use(cors());
app.use(express.json());

app.use('/api/v1/users/', userRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
}
);