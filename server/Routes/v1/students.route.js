const express = require("express");
const router = express.Router();

const multer = require("multer");

const {
  postStudentDetailsInfoController,
  getStudentDetailsInfoController
} = require("../../controller/StudentController/StudentController");

const upload = multer({ storage: multer.memoryStorage() });

// router.post(
//   "/:studentId/:counselorId",
//   upload.fields([
//     {
//       name: "sscCertificate",
//       maxCount: 1,
//     },
//     {
//       name: "sscTranscript",
//       maxCount: 1,
//     },
//     {
//       name: "hscCertificate",
//       maxCount: 1,
//     },
//     {
//       name: "hscTranscript",
//       maxCount: 1,
//     },
//     {
//       name: "hscRecommendation",
//       maxCount: 1,
//     },
//     {
//       name: "honsCertificate",
//       maxCount: 1,
//     },
//     {
//       name: "honsTranscript",
//       maxCount: 1,
//     },
//     {
//       name: "honsRecommendation",
//       maxCount: 1,
//     },
//     {
//       name: "mscCertificate",
//       maxCount: 1,
//     },
//     {
//       name: "mscTranscript",
//       maxCount: 1,
//     },
//     {
//       name: "mscRecommendation",
//       maxCount: 1,
//     },
//     {
//       name: "ielts",
//       maxCount: 1,
//     },
//     {
//       name: "cv",
//       maxCount: 1,
//     },
//     {
//       name: "passport",
//       maxCount: 1,
//     },
//     {
//       name: "extraCA",
//       maxCount: 1,
//     },
//     {
//       name: "bankSolvency",
//       maxCount: 1,
//     },
//   ]),
//   postStudentDetailsInfoController
// );

router.post('/add-documents/:studentId/:counselorId', upload.fields([
  { name: 'sscCertificate', maxCount: 1 },
  { name: 'sscTranscript', maxCount: 1 },
  { name: 'hscCertificate', maxCount: 1 },
  { name: 'hscTranscript', maxCount: 1 },
  { name: 'hscRecommendation', maxCount: 1 },
  { name: 'honsCertificate', maxCount: 1 },
  { name: 'honsTranscript', maxCount: 1 },
  { name: 'honsRecommendation', maxCount: 1 },
  { name: 'mscCertificate', maxCount: 1 },
  { name: 'mscTranscript', maxCount: 1 },
  { name: 'mscRecommendation', maxCount: 1 },
  { name: 'ielts', maxCount: 1 },
  { name: 'cv', maxCount: 1 },
  { name: 'passport', maxCount: 1 },
  { name: 'extraCA', maxCount: 1 },
  { name: 'bankSolvency', maxCount: 1 }
]), postStudentDetailsInfoController);

router.route("/:studentId/:counselorId").get(getStudentDetailsInfoController);

module.exports = router;


