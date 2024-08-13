const express = require("express");
const router = express.Router();
const {
    getAllRoleByEmailController,deleteRole
} = require("../../controller/Role/update.controller.js");

router.route("/:email").get(getAllRoleByEmailController),
router.route("/:_id").delete(deleteRole),

module.exports = router;