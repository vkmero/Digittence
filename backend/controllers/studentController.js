const Student = require("../models/Student");

exports.getRollNos = async (req, res) => {
  const students = await Student.find({}, "rollNo");
  res.json({ rollNos: students.map(s => s.rollNo) });
};
