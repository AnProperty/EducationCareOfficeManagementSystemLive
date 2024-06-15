const CreateEmployee = require("../../model/CreateEmployee.model");
const CreateStudent = require("../../model/CreateStudent.model");
const UniversityDocsModel = require("../../model/UnivarsityDocsForVisa.model");
const AppliedUniversity = require("../../model/UniversityApplication");

const cloudinaryService = require('../cloudinaryService')

exports.getApplicantStudentByApplicantId = async (query) => {
  console.log("object", query);
  const requestedInfo = await CreateEmployee.find(query)
    .select("students")
    .populate({
      path: "students",
    });

  return requestedInfo;
};
exports.getStudentApplicationServices = async (query) => {
  console.log("getStudentApplicationServices", query);
  const { studentId, counselorId } = query;
  const requestedInfo = await AppliedUniversity.find({
    $and: [{ stdId: studentId }, { counselorId: counselorId }],
  });

  return requestedInfo;
};
exports.universityUploadByApplicantService = async (document) => {
  console.log("universityUploadByApplicantService", document);
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
  console.log("query", query);
  console.log("lyuiyiytu", body);

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
  console.log("..............", registeredInfo);
  return registeredInfo;
};


exports.addUniversityDocsService = async (studentId,studentObjectId,counselorId,applicantId,files,data) => {
  const uploadedFiles = await cloudinaryService.uploadUniResFiles(files,studentId,applicantId);

  const newUniResponseData = new UniversityDocsModel({

    studentId: studentId,
    studentObjectId: studentObjectId,
    counselorId: counselorId,
    applicantId: applicantId,
    offerLetter: uploadedFiles.offerLetter,
    swiftCopy: uploadedFiles.swiftCopy,
    universityPaymentRecept:uploadedFiles.universityPaymentRecept,
    loa: uploadedFiles.loa,
    dol: uploadedFiles.dol,
    pal: uploadedFiles.pal,
    ...data
  });
  console.log("NAIIIIIIIIIIIII",   data.visaTeamId)
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

  await newUniResponseData.save();
  return newUniResponseData;
};


exports.assignedVisaTeamService = async (query) => {
  

  const expectedStudent= await UniversityDocsModel.find(query)

  return expectedStudent[0].visaTeamName;
  
};
exports.getUploadedDocumentsService = async (query) => {
  

  const uploadedDocuments= await UniversityDocsModel.find(query)

  return uploadedDocuments;
  
};
exports.universityDocumentUpdateService = async (query,files) => {
  

  const existingDocument= await UniversityDocsModel.find(query)

  const uploadedFiles = await cloudinaryService.uploadUniResFiles(files,query.universityName,query.country);

  console.log('uploadedFiles:',uploadedFiles)

  console.log('existingDocumentttttttttt:',existingDocument)

  console.log(files)
  Object.keys(uploadedFiles).forEach((key) => {
    if (uploadedFiles[key]) {
      existingDocument[0].set(key, uploadedFiles[key]);
    }
  });

  const doc={...existingDocument[0]}

  const lol =await UniversityDocsModel.updateOne(
    query,
    {
      $set:doc
    }
  );

  console.log('existingDocumenttttttttttafteradding:',lol)
  
};