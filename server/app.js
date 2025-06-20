import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PORT, DB_URI } from "./config/env.js";
import userRouter from "./routes/user.routes.js";
import BOOKS_ROUTE from "./routes/book.routes.js";
import paymentRouter from "./routes/payment.routes.js";
import connectDB from "./database/db.js";
import errorMiddleware from "./middlewares/error.middleware.js";

dotenv.config();
const app = express();

// Setting up middlewares
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/books", BOOKS_ROUTE);
app.use("/api/payment", paymentRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
