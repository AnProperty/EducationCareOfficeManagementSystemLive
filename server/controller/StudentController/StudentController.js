const cloudinary = require('../../config/cloudinary');
const {
  postStudentDetailsService,
  GetStudentDetailsService,
  GetStudentDocsService
} = require("../../services/studentServices/studentServices");



exports.postStudentDetailsInfoController = async (req,res) => {
  try {
    const { studentId } = req.params;
    const { counselorId } = req.params;
    const { documentName } = req.body;


    const fileUpload = await cloudinary.uploader.upload(req.file.path, {
      folder: `students/${documentName}`,
    });


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
