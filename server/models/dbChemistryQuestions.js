const mongoose = require("mongoose");

const chemQuestionsSchema = mongoose.Schema({
  topicName: { type: String, required: true },
  question: { type: String, required: true, unique: true },
  imgUrl: { type: String },
  difficulty: { type: String, required: true },
  option1: { type: String, required: true },
  option2: { type: String, required: true },
  option3: { type: String, required: true },
  option4: { type: String, required: true },
  option1Img: { type: String },
  option2Img: { type: String },
  option3Img: { type: String },
  option4Img: { type: String },
  answer: { type: String, required: true },
  answerImg: { type: String },
});

module.exports = mongoose.model("chemistry_questions", chemQuestionsSchema);
