const express = require("express");
const router = express.Router();

const multer = require("multer");

const {
  getApplicantStudentByApplicantIdController,
  universityUploadByApplicantController,
  universityUpdateByApplicantController,
  getStudentAppliedUniversity,
  getAssignedVisaTeam,
  getUploadedDocuments,
  universityDocUpdateController,
} = require("../../controller/ApplicantController/ApplicantController");

const upload = multer({ storage: multer.memoryStorage() });

router
  .route("/:employee_id")
  .get(getApplicantStudentByApplicantIdController);
  
router
  .route("/university-upload/:studentId/:counselorId/:applicantId")
  .post(universityUploadByApplicantController)
  .patch(universityUpdateByApplicantController);

router
  .route("/university-upload/:studentId/:counselorId")
  .get(getStudentAppliedUniversity);

router
  .route("/get-visa-team/:studentId/:applicantId")
  .get(getAssignedVisaTeam);

router
  .route(
    "/get-uploaded-documents/:studentId/:country/:universityName/:subject/:intake"
  )
  .get(getUploadedDocuments);

router
  .route(
    "/get-uploaded-documents/:studentId/:country/:universityName/:subject/:intake"
  )
  .patch(
    upload.fields([
      { name: "offerLetter", maxCount: 1 },
      { name: "swiftCopy", maxCount: 1 },
      { name: "universityPaymentRecept", maxCount: 1 },
      { name: "loa", maxCount: 1 },
      { name: "dol", maxCount: 1 },
      { name: "pal", maxCount: 1 },
    ]),
    universityDocUpdateController
  );

module.exports = router;
