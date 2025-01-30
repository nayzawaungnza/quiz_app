import express from "express";
import { getQuiz, postQuiz } from "../controllers/QuizController.js";
import {getUser, postUser, getUserById, updateUser, deleteUser} from "../controllers/UserController.js";
const router = express.Router();

router.get("/quiz", getQuiz);

router.post("/quiz", postQuiz);

router.get("/user", getUser);

router.post("/user", postUser);

router.get("/user/:id", getUserById);

router.put("/user/:id", updateUser);

router.delete("/user/:id", deleteUser);

export default router;