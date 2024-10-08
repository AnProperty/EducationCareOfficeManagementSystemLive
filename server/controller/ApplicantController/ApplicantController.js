const CreateEmployee = require("../../model/CreateEmployee.model");
const CreateStudent = require("../../model/CreateStudent.model");
const Notification = require("../../model/Notification.model");
const {
  getApplicantStudentByApplicantId,
  universityUploadByApplicantService,
  universityUpdateByApplicantService,
  getStudentApplicationServices,
  assignedVisaTeamService,
  addUniversityDocsService,
  getUploadedDocumentsService,
  universityDocumentUpdateService,
  getApplicantStudentSuggestion
} = require("../../services/ApplicantServices/ApplicantServices");

exports.getApplicantStudentByApplicantIdController = async (req, res, next) => {
  try {
    const query = req.params;
   
    const request = await getApplicantStudentByApplicantId(query);
    res.status(200).json({
      status: "success",
      message: "Get successfully",
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


exports.getStudentAppliedUniversity = async (req, res, next) => {
  try {
    const query = req.params;
    const request = await getStudentApplicationServices(query);
    res.status(200).json({
      status: "success",
      message: "Get Application Data successfully",
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

exports.universityUploadByApplicantController = async (req, res, next) => {
  try {
    const { studentId, counselorId, applicantId } = req.params;
    const document = {
      stdId: studentId,
      counselorId: counselorId,
      applicantId: applicantId,
      universities: [req.body],
    };
    const request = await universityUploadByApplicantService(document);
    res.status(200).json({
      status: "success",
      message: "Applied University Updated successfully",
      data: request,
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: "Can't Post data",
      error: err,
    });
  }
};
exports.universityUpdateByApplicantController = async (req, res, next) => {
  try {
    const request = await universityUpdateByApplicantService(
      req.params,
      req.body
    );
    res.status(200).json({
      status: "success",
      message: "Applied University Updated successfully",
      data: request,
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: "Can't Post data",
      error: err,
    });
  }
};
exports.postUniversityDocsController = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const studentObjectId = req.params.studentObjectId;
    const counselorId = req.params.counselorId;
    const applicantId = req.params.applicantId;
    const files = req.files;
    const data = req.body;
    const uniData = await addUniversityDocsService(
      studentId,
      studentObjectId,
      counselorId,
      applicantId,
      files,
      data
    );
    console.log("xxxxxxxxxxxxxxxxxxxxx",data)
    const student = await CreateStudent.findById(studentObjectId);
    const visaTeam = await CreateEmployee.findOne({"employee_id":data.visaTeamId})
    if (uniData) {
      const notification = new Notification({
        message: `A new student has been assigned to you for visa application: ${student.fullName}`,
        employeeId: visaTeam.employee_id,
        studentId: studentId,
        counselorId: student.counselor.employee_id,
        for: "visa application",
      });
      await notification.save();

      const io = req.app.get("socketio");
      io.emit("notification", notification);
    }
    res.status(200).json({
      status: "success",
      message: "University data added successfully",
      data: uniData,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAssignedVisaTeam = async (req, res, next) => {
  try {
    const request = await assignedVisaTeamService(req.params);
    res.status(200).json({
      status: "success",
      message: "Applied University Updated successfully",
      data: request,
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: "Can't Post data",
      error: err,
    });
  }
};
exports.getUploadedDocuments = async (req, res, next) => {
  try {
    const request = await getUploadedDocumentsService(req.params);
    res.status(200).json({
      status: "success",
      message: "Applied University Updated successfully",
      data: request[0],
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: "Can't Post data",
      error: err,
    });
  }
};
exports.universityDocUpdateController = async (req, res, next) => {

  try {
    const request = await universityDocumentUpdateService(req.params,req.files,req.body);
    res.status(200).json({
      status: "success",
      message: "Applied University Updated successfully",
      data: request[0],
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: "Can't Post data",
      error: err,
    });
  }
};
