const { getNotificationServices, markAsReadNotificationServices, getStudentDetailsServices } = require("../../services/notificationServices/notification.service");

  
  exports.getNotificationController = async (req, res, next) => {
    try {
      const employeeId = req.params.employeeId;
      const request = await getNotificationServices(employeeId);
      if (request) {
        res.status(200).json({
          status: "Success",
          message: "LogIn successfully",
          data: request,
        });
      }
    } catch (err) {
      next(err);
    }
  };
  exports.getStudentDetailsController = async (req, res, next) => {
    try {
      // console.log('PARAMS1111111111111111111',req);
      // const employeeId = req.params.employeeId;
      const request = await getStudentDetailsServices(req.params);
      if (request) {
        res.status(200).json({
          status: "Success",
          message: "LogIn successfully",
          data: request,
        });
      }
    } catch (err) {
      next(err);
    }
  };
  exports.markAsReadNotificationController = async (req, res, next) => {
    try {
      const request = await markAsReadNotificationServices(req.params.id);
      res.status(200).json({
        status: "Success",
        message: "update successfully",
        data: request,
      });
    } catch (error) {
      next(error);
    }
  };