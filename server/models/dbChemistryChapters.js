const mongoose = require("mongoose");

const chemchaptersSchema = mongoose.Schema({
  id: Number,
  name: String,
  value: String,
  isChecked: Boolean,
  isCheckBoxDis: Boolean,
  isNumDisabled: Boolean,
  isRandChecked: Boolean,
});

module.exports = mongoose.model("chemistryChapters", chemchaptersSchema);
