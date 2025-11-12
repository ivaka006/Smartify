import express from 'express';
import router from "./routes/routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/getPlan", router);

app.listen(8000, () => console.log(`Server is running on port 8000`));
