const mongoose = require("mongoose");

const mathsQuestionsSchema = mongoose.Schema({
  topicName: { type: String, required: true },
  question: { type: String, required: true },
  questionsUrls: [
    {
      url: {
        type: String,
        trim: true,
      },
      url: {
        type: String,
        trim: true,
      },
      url: {
        type: String,
        trim: true,
      },
    },
  ],
  difficulty: { type: String, required: true },
  option1: { type: String, required: true },
  option2: { type: String, required: true },
  option3: { type: String, required: true },
  option4: { type: String, required: true },
  optionsUrls: [
    {
      url: {
        type: String,
        trim: true,
      },
      url: {
        type: String,
        trim: true,
      },
      url: {
        type: String,
        trim: true,
      },
      url: {
        type: String,
        trim: true,
      },
    },
  ],
  answer: { type: String, required: true },
  answersUrls: [
    {
      url: {
        type: String,
        trim: true,
      },
      url: {
        type: String,
        trim: true,
      },
      url: {
        type: String,
        trim: true,
      },
    },
  ],
});

module.exports = mongoose.model("maths_questions", mathsQuestionsSchema);
