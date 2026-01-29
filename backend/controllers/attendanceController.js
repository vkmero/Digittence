const Attendance = require("../models/Attendance");

exports.finalSubmit = async (req, res) => {
  const { attendance } = req.body;

  const records = Object.entries(attendance).map(
    ([rollNo, status]) => ({ rollNo, status })
  );

  await Attendance.insertMany(records);
  res.json({ message: "Attendance saved" });
};
