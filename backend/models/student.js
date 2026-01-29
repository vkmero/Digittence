const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  rollNo: { type: String, unique: true }
});

module.exports = mongoose.model("Student", studentSchema);
