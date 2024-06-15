const express = require("express");
const router = express.Router();

const {
  CreateStudentController,
  GetAllStudentListController,
  GetAStudentByIdController
} = require("../../controller/ReceptionistController/Receptionist.controller");

router.route("/add-student").post(CreateStudentController);
router.route("/get-students-list").get(GetAllStudentListController);
router.route("/student/:studentId").get(GetAStudentByIdController);

module.exports = router;
