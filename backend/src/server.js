import express from 'express';
import router from "./routes/routes.js";
import { connctDB } from './config/db.js';
import dotenv from "dotenv"

dotenv.config()

const app = express();

connctDB()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", router);

app.listen(8000, () => console.log(`Server is running on port 8000`));







//mongodb+srv://smartifycoach_db_user:KFYnumNLtU9aBOzT@smartifycoach.nespqww.mongodb.net/?appName=SmartifyCoach