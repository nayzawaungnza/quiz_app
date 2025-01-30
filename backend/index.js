import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import QuizRouter from "./routes/QuizRoute.js";
const app = express();

dotenv.config();

const port = process.env.PORT || 5000;
const mongoUrl = process.env.DBURI;
// middleware
app.use(express.json());
const corsOptions = { origin: "*" };
app.use(cors(corsOptions));
//routers
app.use('/api', QuizRouter);


 mongoose
        .connect(mongoUrl)
        .then(() => console.log("DB connected"))
        .catch((e) => console.log(e));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

export default (req, res) => app(req, res);
