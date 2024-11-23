//models
const ChatBot = require("../models/chatBotModel");
//middlewares
const asyncWrapper = require("../middlewares/asyncWrapper");
//utils
const httpResponse = require("../utils/httpRespone");

// post questions and answers
const setQuestions = asyncWrapper(async (req, res) => {
    const { question, answer } = req.body;

    if (!question || !answer) {
        return res
            .status(400)
            .json(httpResponse.badResponse(400, "Invalid data"));
    }

    const newQuestion = new ChatBot({
        question,
        answer,
    });

    await newQuestion.save();

    res.status(201).json(
        httpResponse.goodResponse(201, newQuestion, "question has been saved")
    );
});

// get answers
const answerQuestions = asyncWrapper(async (req, res) => {
    const { question } = req.body;

    if (!question) {
        return res
            .status(400)
            .json(httpResponse.badResponse(400, "Invalid data"));
    }

    const data = await ChatBot.find({}, { __v: false });

    const answers = data.filter((q) => {
        // if (q.question.includes(question)) {
        //     return { answer: q.answer, from: "bot" };
        // }

        return q.question.includes(question);
    });

    res.status(200).json(httpResponse.goodResponse(200, answers));
});

// get all data
const quesAndAnsw = asyncWrapper(async (req, res) => {
    const data = await ChatBot.find({}, { __v: false });
    res.status(200).json(httpResponse.goodResponse(200, data));
});

module.exports = { setQuestions, answerQuestions, quesAndAnsw };
