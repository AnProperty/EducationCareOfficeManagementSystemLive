const express = require("express");
const router = express.Router();

const multer = require("multer");

const {
  postStudentDetailsInfoController,
  getStudentDetailsInfoController,
  getStudentDocsController,
  getStudentInfoController
} = require("../../controller/StudentController/StudentController");

const upload = multer({ dest: 'uploads/' }); 

router.route("/:studentId").get(getStudentInfoController);
router.post('/add-documents/:studentId/:counselorId', upload.single('file'), postStudentDetailsInfoController);
router.get('/get-documents/:studentId/', getStudentDocsController);
router.route("/:studentId/:counselorId").get(getStudentDetailsInfoController);


module.exports = router;


