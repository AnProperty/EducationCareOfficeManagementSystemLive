const express = require("express");
const router = express.Router();
const {
  downloadStudentDocumentController,
  downloadUniDocsController,downloadData
} = require("../../controller/UtilitiesController/UtilitiesController");

router
  .route("/download-docs/:studentId")
  .get(downloadStudentDocumentController);
router
  .route("/download-docs/:applicantId/:studentId")
  .get(downloadUniDocsController);
router.route("/download-leads/:status").get(downloadData);

module.exports = router;
