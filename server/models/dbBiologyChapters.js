const mongoose = require("mongoose");

const biochaptersSchema = mongoose.Schema({
  id: Number,
  name: String,
  value: String,
  isChecked: Boolean,
  isCheckBoxDis: Boolean,
  isNumDisabled: Boolean,
  isRandChecked: Boolean,
});

module.exports = mongoose.model("biologyChapters", biochaptersSchema);
