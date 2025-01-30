import QuizModel from "../models/QuizModel.js";
export const getQuiz = async (req, res) => {
    const quiz = await QuizModel.find({},{_id:1,question:1,answers:1});
    res.status(200).json(quiz);
}

export const postQuiz = async (req, res) => {
    const {question, answers} = req.body;
    const newQuiz = new QuizModel({question, answers});
    await newQuiz.save();
    res.status(201).json(newQuiz);
}