const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const savedPapersSchema = mongoose.Schema({
  user: {
    type: ObjectId,
    ref: "User",
  },
  phyArr: [
    {
      questions: {
        type: ObjectId,
        ref: "physics_questions",
      },
    },
  ],
  chemArr: [
    {
      questions: {
        type: ObjectId,
        ref: "chemistry_questions",
      },
    },
  ],

  mathsArr: [
    {
      questions: {
        type: ObjectId,
        ref: "maths_questions",
      },
    },
  ],
  bioArr: [
    {
      questions: {
        type: ObjectId,
        ref: "biology_questions",
      },
    },
  ],
  marks: {
    type: String,
    required: true,
  },
  subjects: [
    {
      type: String,
      required: true,
    },
  ],
  negMarks: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  thrs: {
    type: String,
    required: true,
  },
  tmins: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("saved_papers", savedPapersSchema);
