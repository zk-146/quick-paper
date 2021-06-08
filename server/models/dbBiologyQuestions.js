const mongoose = require("mongoose");

const bioQuestionsSchema = mongoose.Schema({
  topicName: { type: String, required: true },
  question: { type: String, required: true, unique: true },
  imgUrl: { type: String, required: true },
  difficulty: { type: String, required: true },
  option1: { type: String, required: true },
  option2: { type: String, required: true },
  option3: { type: String, required: true },
  option4: { type: String, required: true },
  option1Img: { type: String, required: true },
  option2Img: { type: String, required: true },
  option3Img: { type: String, required: true },
  option4Img: { type: String, required: true },
  answer: { type: String, required: true },
  answerImg: { type: String, required: true },
});

module.exports = mongoose.model("biology_questions", bioQuestionsSchema);
