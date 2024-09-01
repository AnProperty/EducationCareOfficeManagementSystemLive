const CreateStudent = require("../../model/CreateStudent.model");
const Notification = require("../../model/Notification.model");

exports.getNotificationServices = async (employeeId) => {
  try {
    const notifications = await Notification.find({ "employeeId": employeeId }).sort({ createdAt: -1 });
    return notifications;
  } catch (error) {
    throw error;
  }
};
exports.getStudentDetailsServices = async (params) => {
  try {

    console.log('PARAMS', params);


    const StudentDetails = await CreateStudent.find(params);
    return StudentDetails;
  } catch (error) {
    throw error;
  }
};
exports.markAsReadNotificationServices = async (query) => {
  try {
    const notification = await Notification.findByIdAndUpdate(query, { isRead: true }, { new: true });
    return notification;
  } catch (error) {
    throw error;
  }
};