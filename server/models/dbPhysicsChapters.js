const mongoose = require("mongoose");

const phychaptersSchema = mongoose.Schema({
  id: Number,
  name: String,
  value: String,
  isChecked: Boolean,
  isCheckBoxDis: Boolean,
  isNumDisabled: Boolean,
  isRandChecked: Boolean,
});

module.exports = mongoose.model("physicsChapters", phychaptersSchema);
