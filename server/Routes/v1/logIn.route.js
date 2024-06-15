const express = require("express");
const router = express.Router();
const {
  logInController,
} = require("../../controller/LogInController/LogInController");

router.route("/").post(logInController);

module.exports = router;
