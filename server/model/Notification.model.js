const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "CreateEmployee",required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "CreateStudent",required: true },
  for: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;