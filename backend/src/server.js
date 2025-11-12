import express from 'express';
import router from "./routes/routes.js";
import { connctDB } from './config/db.js';
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config()

const app = express();

connctDB()

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", router);

app.listen(8000, () => console.log(`Server is running on port 8000`));







//mongodb+srv://smartifycoach_db_user:KFYnumNLtU9aBOzT@smartifycoach.nespqww.mongodb.net/?appName=SmartifyCoach