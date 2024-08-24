const CreateEmployee = require("../../model/CreateEmployee.model");
const CreateStudent = require("../../model/CreateStudent.model");
const UniversityDocsModel = require("../../model/UnivarsityDocsForVisa.model");
const AppliedUniversity = require("../../model/UniversityApplication");

const cloudinaryService = require('../cloudinaryService')

exports.getApplicantStudentByApplicantId = async (query) => {
  
  const requestedInfo = await CreateEmployee.find(query)
    .select("students")
    .populate({
      path: "students",
    });

  return requestedInfo;
};

exports.getStudentApplicationServices = async (query) => {
  const { studentId, counselorId } = query;
  const requestedInfo = await AppliedUniversity.find({
    $and: [{ stdId: studentId }, { counselorId: counselorId }],
  });

  return requestedInfo;
};
exports.universityUploadByApplicantService = async (document) => {
  
  await CreateStudent.updateOne(
    {
      studentId: document.stdId,
    },
    {
      $set: {
        status: "application-processing",
      },
    }
  );
  const requestedInfo = await AppliedUniversity.create(document);

  return requestedInfo;
};

exports.universityUpdateByApplicantService = async (query, body) => {
  const { studentId, counselorId, applicantId } = query;


  const registeredInfo = await AppliedUniversity.updateOne(
    {
      $and: [
        { stdId: studentId },
        { counselorId: counselorId }
      ],
    },
    {
      $push: {
        universities: body,
      },
    }
  );
  return registeredInfo;
};


exports.addUniversityDocsService = async (studentId, studentObjectId, counselorId, applicantId, files, data) => {
  const uploadedFiles = await cloudinaryService.uploadUniResFiles(files, studentId, applicantId);

  const newUniResponseData = new UniversityDocsModel({

    studentId: studentId,
    studentObjectId: studentObjectId,
    counselorId: counselorId,
    applicantId: applicantId,
    offerLetter: uploadedFiles.offerLetter,
    swiftCopy: uploadedFiles.swiftCopy,
    universityPaymentRecept: uploadedFiles.universityPaymentRecept,
    loa: uploadedFiles.loa,
    dol: uploadedFiles.dol,
    pal: uploadedFiles.pal,
    ...data
  });

  if (data.visaTeamId) {
    await CreateEmployee.updateOne(
      {
        employee_id: data.visaTeamId,
      },
      {
        $push: {
          students: studentObjectId
        },
      }
    );
    await CreateStudent.updateOne(
      {
        studentId: studentId,
      },
      {
        $set: {
          status: "visa-processing"
        },
      }
    );
  }


  await newUniResponseData.save();
  return newUniResponseData;
};


exports.assignedVisaTeamService = async (query) => {


  const expectedStudent = await UniversityDocsModel.find(query)

  return expectedStudent[0].visaTeamName;

};
exports.getUploadedDocumentsService = async (query) => {


  const uploadedDocuments = await UniversityDocsModel.find(query)

  return uploadedDocuments;

};
exports.universityDocumentUpdateService = async (query, files, body) => {

  const stdObj = query.studentObjectId;
  await CreateEmployee.updateOne(
    {
      employee_id: body.visaTeamId,
    },
    {
      $addToSet: {
        students: stdObj
      },
    }
  );
  delete query.studentObjectId;
  const existingDocument = await UniversityDocsModel.find(query)

  const uploadedFiles = await cloudinaryService.uploadUniResFiles(files, query.universityName, query.country);


  Object.keys(uploadedFiles).forEach((key) => {
    if (uploadedFiles[key]) {
      existingDocument[0].set(key, uploadedFiles[key]);
    }
  });
  body.visaTeamId && existingDocument[0].set('visaTeamId', body.visaTeamId)
  body.visaTeamName && existingDocument[0].set('visaTeamName', body.visaTeamName)

  const doc = { ...existingDocument[0] }


  await UniversityDocsModel.updateOne(
    query,
    {
      $set: doc
    }
  );

};