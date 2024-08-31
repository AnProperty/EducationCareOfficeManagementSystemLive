const express = require("express");
const router = express.Router();
const {
  downloadStudentDocumentController,
  downloadUniDocsController, downloadData, downloadDateData, filterApplicantController,
  SuggestStudentsNameController,
  downloadDataForSpecificEmployeeController,
  DeleteStudent,getArchiveStudents,restoreStudentFromArchive
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

router.route("/delete-student/:studentId/:employeeId").delete(DeleteStudent);
router.route("/archived-students").get(getArchiveStudents);
router.route("/restore-student").post(restoreStudentFromArchive);

module.exports = router;
