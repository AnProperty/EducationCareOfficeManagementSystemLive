const express = require("express");
const router = express.Router();

const multer = require("multer");

const {
    postUniversityDocsController
} = require("../../controller/ApplicantController/ApplicantController");


const upload = multer({ storage: multer.memoryStorage() });

router.post('/:studentId/:counselorId/:applicantId/:studentObjectId', upload.fields([
    { name: 'offerLetter', maxCount: 1 },
    { name: 'swiftCopy', maxCount: 1 },
    { name: 'universityPaymentRecept', maxCount: 1 },
    { name: 'loa', maxCount: 1 },
    { name: 'dol', maxCount: 1 },
    { name: 'pal', maxCount: 1 },
]), postUniversityDocsController);



// router
//   .route("/university-upload/:studentId/:counselorId/:applicantId")
//   .post(universityUploadByApplicantController)
//   .patch(universityUpdateByApplicantController);
// router
//   .route("/university-upload/:studentId/:counselorId")
//   .get(getStudentAppliedUniversity);

module.exports = router;
