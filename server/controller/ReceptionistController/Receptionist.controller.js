const CreateStudent = require("../../model/CreateStudent.model");
const Notification = require("../../model/Notification.model");
const {
  createStudentServices,
  GetAllStudentListServices,
  GetAStudentByEmailAndNameServices,
} = require("../../services/receptionistServices/receptionistServices");

exports.CreateStudentController = async (req, res, next) => {
  try {
    const studentInfo = await createStudentServices(req.body);
    console.log("ssssssssssssssssssssssss", studentInfo);
    if (studentInfo) {
      const notification = new Notification({
        message: `A new student has been assigned to you for counseling: ${studentInfo.fullName}`,
        employeeId: studentInfo?.counselor?.employee_id,
        studentId: studentInfo.studentId,
        for: "counseling",
      });
      await notification.save();

      const io = req.app.get("socketio");
      io.emit("notification", notification);
    }
    res.status(200).json({
      status: "success",
      message: "Student Created successfully",
      data: studentInfo,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Can't Register Student",
      error: error,
    });
  }
};
exports.GetAllStudentListController = async (req, res, next) => {
  try {
    const studentList = await GetAllStudentListServices();
    res.status(200).json({
      status: "success",
      message: "Get All Students List successfully",
      data: studentList,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Can't get Employee List",
      error: error,
    });
  }
};
exports.GetAStudentByNameAndEmailController = async (req, res, next) => {
  try {
    const student = await GetAStudentByEmailAndNameServices(req.params);
    res.status(200).json({
      status: "success",
      message: "Get a student successfully",
      data: student,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Can't get a student",
      error: error,
    });
  }
};
//------------------------??
exports.GetLastStudentIdController = async (req, res, next) => {
  try {
    const total = await CreateStudent.countDocuments({});
    res.json({ data: total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
