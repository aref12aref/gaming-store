//modules
const express = require("express");
//controlers
const chatBotControler = require("../controlers/chatBotControler.js");

//routes
const router = express.Router();

router
    .route("/")
    .get(chatBotControler.quesAndAnsw)
    .post(chatBotControler.setQuestions);

router.route("/answers").post(chatBotControler.answerQuestions);

module.exports = router;
