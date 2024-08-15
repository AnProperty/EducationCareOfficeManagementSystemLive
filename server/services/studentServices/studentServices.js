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

// exports.postStudentDetailsService = async (studentId, counselorId, documentName, file) => {
//   try {
//     console.log(studentId, counselorId, documentName, file);
//     // Update the student's status
//     const updateResult = await CreateStudent.updateOne(
//       { studentId: studentId },
//       { $set: { status: "enrolled" } }
//     );
    
//     // Check if the update was successful
//     if (updateResult.nModified === 0) {
//       throw new Error("Failed to update student status.");
//     }

//     // Create a new document with the dynamic field name
//     const newEnrolled = new StudentDetailsModel({
//       studentId: studentId,
//       counselorId: counselorId,
//       [`${documentName}`]: file,
//     });

//     // Save the new document
//     await newEnrolled.save();
    
//     return newEnrolled;
//   } catch (error) {
//     console.error("Error in postStudentDetailsService:", error);
//     throw new Error("Error while saving student details.");
//   }
// };


exports.postStudentDetailsService = async (studentId, counselorId, documentName, file) => {
  try {
    console.log(studentId, counselorId, documentName, file);

    // Update the student's status
    const updateResult = await CreateStudent.updateOne(
      { studentId: studentId },
      { $set: { status: "enrolled" } }
    );
    
    // Check if the update was successful
    if (updateResult.nModified === 0) {
      throw new Error("Failed to update student status.");
    }

    // Use findOneAndUpdate to either update an existing document or create a new one
    const updateOptions = {
      upsert: true, // Create a new document if none exists
      new: true,    // Return the updated document
      setDefaultsOnInsert: true // Apply default values for new documents
    };

    const updateFields = { [`${documentName}`]: file };

    const updatedDocument = await StudentDetailsModel.findOneAndUpdate(
      { studentId: studentId },
      { $set: updateFields, counselorId: counselorId },
      updateOptions
    );

    return updatedDocument;
  } catch (error) {
    console.error("Error in postStudentDetailsService:", error);
    throw new Error("Error while saving student details.");
  }
};

exports.GetStudentDetailsService = async (query) => {
  const studentInfo = await StudentDetailsModel.find(query);
  return studentInfo;
};
exports.GetStudentDocsService = async (query) => {
  console.log(query)
  const studentInfo = await StudentDetailsModel.find(query).select('-_id -studentId -counselorId -createdAt -updatedAt -__v');
  console.log("aaaaaaaa",studentInfo)
  if(studentInfo[0] === undefined) {
    return { sscCertificate: null,
      sscTranscript: null,
      hscCertificate: null,
      hscTranscript: null,
      hscRecommendation: null,
      honsCertificate: null,
      honsTranscript: null,
      honsRecommendation: null,
      mscCertificate: null,
      mscTranscript: null,
      mscRecommendation: null,
      ielts: null,
      cv: null,
      passport: null,
      extraCA: null,
      bankSolvency: null,
    };
  }
  else return studentInfo[0]
};
