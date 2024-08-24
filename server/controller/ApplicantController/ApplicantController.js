const CreateEmployee = require("../../model/CreateEmployee.model");
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
    console.log("getStudentAppliedUniversity Clicked");
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
    console.log("document", document);
    const request = await universityUploadByApplicantService(document);
    console.log('requesttttttttttttttttttttttttttttttttttttt:',request)
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
    console.log("OKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK",data)
    //console.log(studentId,studentObjectId,counselorId,applicantId,files)
    const uniData = await addUniversityDocsService(
      studentId,
      studentObjectId,
      counselorId,
      applicantId,
      files,
      data
    );
    console.log('aaaaaaaaaaaaaaaaaa:',uniData)
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
  console.log("uffffffffffffff", req.params);
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
  console.log("uffffffffffffffAhhhhh", req.params);
  try {
    const request = await getUploadedDocumentsService(req.params);
    console.log('requestttttttt: ',request)
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
  // console.log("uffffffffffffffAhhhhh", req.params);
  // console.log("AHHHHHHHHHHHHHHHHHHHHHHHH:",req.files);
  console.log("bodyyyyyyyyyyyyyyyyyyyyyyyyyyyyy:",req.body)
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
