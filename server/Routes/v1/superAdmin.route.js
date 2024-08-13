const express = require("express");
const multer = require('multer');

const router = express.Router();

const {
  CreateEmployeeController,
  GetAllEmployeeListController,
  GetAllStudentListController,
  DownloadEmployeeFiles,
  GetAllCommissionListController, filterLeadsController, addNewRoleController
} = require("../../controller/SuperAdminController/superAdmin.controller");


const upload = multer({ storage: multer.memoryStorage() });

router.post('/add-employee', upload.fields([
  { name: 'profilePic', maxCount: 1 },
  { name: 'cv', maxCount: 1 },
  { name: 'resume', maxCount: 1 }
]), CreateEmployeeController);

router.route("/get-student-list").get(GetAllStudentListController);
router.route("/get-employee-list").get(GetAllEmployeeListController);
router.route("/add-new-role").post(addNewRoleController);
router.route("/get-commission-list").get(GetAllCommissionListController);
router.route("/filter-leads/:status").get(filterLeadsController);
router.route("/download-employee-docs/:employee_id").get(DownloadEmployeeFiles);

module.exports = router;
