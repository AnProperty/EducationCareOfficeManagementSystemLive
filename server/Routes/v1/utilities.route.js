const express = require("express");
const router = express.Router();
const {
  downloadStudentDocumentController,
  downloadUniDocsController, downloadData, downloadDateData, filterApplicantController,
  SuggestStudentsNameController,
  downloadDataForSpecificEmployeeController
} = require("../../controller/UtilitiesController/UtilitiesController");

router
  .route("/download-docs/:studentId")
  .get(downloadStudentDocumentController);
router
  .route("/filter-student-list/:employee_id")
  .get(filterApplicantController);
router
  .route("/get-student-suggestion/:employee_id")
  .get(SuggestStudentsNameController);
router
  .route("/download-docs/:applicantId/:studentId")
  .get(downloadUniDocsController);
router.route("/download-leads").get(downloadData);
router.route("/download-leads/:employee_id").get(downloadDataForSpecificEmployeeController);
router.route("/download-specific-date").post(downloadDateData);

module.exports = router;
