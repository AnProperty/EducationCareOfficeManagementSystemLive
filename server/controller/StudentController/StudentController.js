const cloudinary = require('../../config/cloudinary');
const {
  postStudentDetailsService,
  GetStudentDetailsService,
  GetStudentDocsService
} = require("../../services/studentServices/studentServices");

// exports.postStudentDetailsInfoController = async (req, res, next) => {
//   try {
//     const data = {
//       'studentId': req.params.studentId,
//       'counselorId': req.params.counselorId,
//       'ssc': {
//         'sscCertificate': req.files.sscCertificate ? req.files.sscCertificate[0].filename : '',
//         'sscTranscript': req.files.sscTranscript ? req.files.sscTranscript[0].filename : '',
//       },
//       'hsc': {
//         'hscCertificate': req.files.hscCertificate ? req.files.hscCertificate[0].filename : '',
//         'hscTranscript': req.files.hscTranscript ? req.files.hscTranscript[0].filename : '',
//         'hscRecommendation': req.files.hscRecommendation ? req.files.hscRecommendation[0].filename : '',
//       },
//       'hons': {
//         'honsCertificate': req.files.honsCertificate ? req.files.honsCertificate[0].filename : "",
//         'honsTranscript': req.files.honsTranscript ? req.files.honsTranscript[0].filename : '',
//         'honsRecommendation': req.files.honsRecommendation ? req.files.honsRecommendation[0].filename : '',
//       },
//       'masters': {
//         'mscCertificate': req.files.mscCertificate ? req.files.mscCertificate[0].filename : '',
//         'mscTranscript': req.files.mscTranscript ? req.files.mscTranscript[0].filename : '',
//         'mscRecommendation': req.files.mscRecommendation ? req.files.mscRecommendation[0].filename : '',
//       },

//       'utilities': {
//         'ielts': req.files.ielts ? req.files.ielts[0].filename : '',
//         'cv': req.files.cv ? req.files.cv[0].filename : '',
//         'passport': req.files.passport ? req.files.passport[0].filename : '',
//         'extraCA': req.files.extraCA ? req.files.extraCA[0].filename : '',
//         'bankSolvency': req.files.bankSolvency ? req.files.bankSolvency[0].filename : '',
//       },
//       'UniversityDocuments': req.body.UniversityDocuments
//     };

//     console.log("lol", data);
//     const details = await postStudentDetailsService(data);
//     console.log("details", details);
//     res.status(200).json({
//       status: "success",
//       message: "Student detail Submitted",
//       data: details,
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "Fail",
//       message: "Can't Submit Student Detail",
//       error: err,
//     });
//   }
// };

exports.postStudentDetailsInfoController = async (req,res) => {
  try {
    console.log("hittttttttttttttttttt")
    const { studentId } = req.params;
    const { counselorId } = req.params;
    const { documentName } = req.body;
    console.log("xxxxxxxxxxxxxxxx",studentId) ;


    const fileUpload = await cloudinary.uploader.upload(req.file.path, {
      folder: `students/${documentName}`,
    });


    console.log(studentId, counselorId, documentName, fileUpload.secure_url)
    const uploadedDocument= await postStudentDetailsService(studentId, counselorId, documentName, fileUpload.secure_url)    

    res.status(200).json({
      status: 'success',
      message: 'Document upload completed successfully',
      data: uploadedDocument,
    });
  } catch (error) {
    console.error('Error uploading document:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.getStudentDetailsInfoController = async (req, res, next) => {
  try {
    console.log("clickkkkkkkkkkkkkkkkkkkkkkkk");
    const details = await GetStudentDetailsService(req.params);
    res.status(200).json({
      status: "success",
      message: "Student Details showed Successfully",
      data: details,
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: "Fail to shown student detail",
      error: err,
    });
  }
};
exports.getStudentDocsController = async (req, res, next) => {
  try {
    console.log("clickkkkkkkkkkkkkkkkkkkkkkkk");
    const docs = await GetStudentDocsService(req.params);
    res.status(200).json({
      status: "success",
      message: "Student Docs get Successfully",
      data: docs,
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: "Fail to shown student detail",
      error: err,
    });
  }
};
