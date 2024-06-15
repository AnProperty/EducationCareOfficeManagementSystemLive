//const EnrolledStudent = require("../../model/EnrolledStudent.model");
const cloudinaryService = require('../cloudinaryService')
const StudentDetailsModel = require("../../model/StudentDetails.model");
const CreateStudent = require('../../model/CreateStudent.model');


// exports.postStudentDetailsService = async (studentInfo) => {
//   await CreateStudent.updateOne(
//     {
//         studentId: studentInfo.studentId
//     },
//     {
//       $set: {
//         status: "enrolled",
//       },
//     }
//   );
//   const existingStudentDetails = await StudentDetailsModel.findOne({
//     studentId: studentInfo.studentId,
//   });
//   if (existingStudentDetails) {
//     existingStudentDetails.set(studentInfo);
//     await existingStudentDetails.save();
//     return existingStudentDetails;
//   } else {

//     const newStudentDetails = new StudentDetailsModel(studentInfo);
//     await newStudentDetails.save();
//     return newStudentDetails;
//   }
// };

exports.postStudentDetailsService = async (studentId,counselorId,files) => {
  await CreateStudent.updateOne(
    {
        studentId: studentId
    },
    {
      $set: {
        status: "enrolled",
      },
    }
  );
  const uploadedFiles = await cloudinaryService.uploadEnrolledStudentFiles(files,studentId);
  const newEnrolled = new StudentDetailsModel({
    studentId: studentId,
    counselorId: counselorId,
    ssc: {
      sscCertificate: uploadedFiles.sscCertificate,
      sscTranscript: uploadedFiles.sscTranscript,
    },
    hsc: {
      hscCertificate: uploadedFiles.hscCertificate,
      hscTranscript: uploadedFiles.hscTranscript,
      hscRecommendation: uploadedFiles.hscRecommendation,
    },
    hons: {
      honsCertificate: uploadedFiles.honsCertificate,
      honsTranscript: uploadedFiles.honsTranscript,
      honsRecommendation: uploadedFiles.honsRecommendation,
    },
    masters: {
      mscCertificate: uploadedFiles.mscCertificate,
      mscTranscript: uploadedFiles.mscTranscript,
      mscRecommendation: uploadedFiles.mscRecommendation,
    },
    utilities: {
      ielts: uploadedFiles.ielts,
      cv: uploadedFiles.cv,
      passport: uploadedFiles.passport,
      extraCA: uploadedFiles.extraCA,
      bankSolvency: uploadedFiles.bankSolvency,
    },
  });
  await newEnrolled.save();
  return newEnrolled;
};
exports.GetStudentDetailsService = async (query) => {
  //console.log(query)
  const studentInfo = await StudentDetailsModel.find(query);
  return studentInfo;
};
