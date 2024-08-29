const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  employeeId: { type: String, required: true },
  studentId: { type: String, required: true },
  counselorId: { type: String, default:null },
  for: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;