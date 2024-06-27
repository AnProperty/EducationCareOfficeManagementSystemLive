const express = require("express");
const router = express.Router();
const {
  downloadStudentDocumentController,
  downloadUniDocsController, downloadData, downloadDateData
} = require("../../controller/UtilitiesController/UtilitiesController");

router
  .route("/download-docs/:studentId")
  .get(downloadStudentDocumentController);
router
  .route("/download-docs/:applicantId/:studentId")
  .get(downloadUniDocsController);
router.route("/download-leads/:status").get(downloadData);
router.route("/download-specific-date").post(downloadDateData);

module.exports = router;
