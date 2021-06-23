const mongoose = require("mongoose");

const chemchaptersSchema = mongoose.Schema({
  name: { type: String, required: true, trim: true },
  value: { type: String, default: "", trim: true },
  isChecked: { type: Boolean, required: true, default: false },
  isCheckBoxDis: { type: Boolean, required: true, default: false },
  isNumDisabled: { type: Boolean, required: true, default: false },
  isRandChecked: { type: Boolean, required: true, default: false },
});

module.exports = mongoose.model("chemistryChapters", chemchaptersSchema);
