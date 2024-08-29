const express = require("express");
const { getNotificationController, markAsReadNotificationController } = require("../../controller/NotificationController/notification.controller");
const router = express.Router();


router.route("/:employeeId").get(getNotificationController);
router.route("/:id/read").put(markAsReadNotificationController);

module.exports = router;