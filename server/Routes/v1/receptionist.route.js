const express = require("express");
const router = express.Router();

const {
  CreateStudentController,
  GetAllStudentListController,
  GetAStudentByNameAndEmailController,
  GetLastStudentIdController
} = require("../../controller/ReceptionistController/Receptionist.controller");

router.route("/add-student").post(CreateStudentController);
router.route("/get-students-list").get(GetAllStudentListController);
router.route("/student/:fullName/:phoneNumber").get(GetAStudentByNameAndEmailController);
router.route("/last-student-id").get(GetLastStudentIdController);

module.exports = router;
