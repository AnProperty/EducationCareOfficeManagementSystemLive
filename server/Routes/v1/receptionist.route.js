const express = require("express");
const router = express.Router();

const {
  CreateStudentController,
  GetAllStudentListController,
} = require("../../controller/ReceptionistController/Receptionist.controller");

router.route("/add-student").post(CreateStudentController);
router.route("/get-students-list").get(GetAllStudentListController);

module.exports = router;
