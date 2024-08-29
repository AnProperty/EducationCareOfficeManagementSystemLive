const CreateStudent = require("../../model/CreateStudent.model");
const Notification = require("../../model/Notification.model");
const {
  getCounselorStudentByCounselorId,
  AssignStudentToApplicantServices,
  makeAdvicesServices,
} = require("../../services/counselorServices/counselor.services");

exports.getCounselorStudentByIdController = async (req, res, next) => {
  try {
    const query = req.params;
    const request = await getCounselorStudentByCounselorId(query);
    res.status(200).json({
      status: "success",
      message: "Get Counselor Student successfully",
      data: request,
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: "Can't Fetched data",
      error: err,
    });
  }
};
exports.AssignStudentToApplicantController = async (req, res, next) => {
  try {
    const query = req.params;
    const request = await AssignStudentToApplicantServices(query, req.body);
    console.log("reqqqqqqqqqqqqqqqqqqqqqq", query, request);
    const student = await CreateStudent.findById(req.params.studentId);
    if (request) {
      const notification = new Notification({
        message: `A new student has been assigned to you for application: ${student.fullName}`,
        employeeId: req.params.apllicantId,
        studentId: req.params.studentId,
        for: "application",
      });
      await notification.save();

      const io = req.app.get("socketio");
      io.emit("notification", notification);
    }
    res.status(200).json({
      status: "success",
      message: "Assigned successfully",
      data: request,
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: "Can't Fetched data",
      error: err,
    });
  }
};
exports.makeAdvicesController = async (req, res, next) => {
  try {
    const query = req.params;
    const request = await makeAdvicesServices(query, req.body.advices);
    res.status(200).json({
      status: "success",
      message: "Assigned successfully",
      data: request,
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: "Can't Fetched data",
      error: err,
    });
  }
};
