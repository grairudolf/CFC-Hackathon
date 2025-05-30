import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const {
  PORT = 5000,
  DB_URI = "mongodb://localhost:27017/bookstore",
  JWT_SECRET,
  JWT_EXPIRATION,
} = process.env;
