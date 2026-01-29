const Student = require("../models/Student");
const Attendance = require("../models/Attendance");

exports.stats = async (req, res) => {
  const students = await Student.countDocuments();
  const classes = await Attendance.distinct("date").count;
  res.json({ students, classes });
};
