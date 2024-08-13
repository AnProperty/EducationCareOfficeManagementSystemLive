const {
    getAllRoleByEmailService, deleteRoleServices
} = require("../../services/employeeRole/getAllRoleByEmailService.js");



exports.getAllRoleByEmailController = async (req, res, next) => {
    try {
        console.log("clickkkkkkkkkkkkkkkkkkkkkkkk", req.params);
        const details = await getAllRoleByEmailService(req.params);
        res.status(200).json({
            status: "success",
            message: "Student Details showed Successfully",
            data: details,
        });
    } catch (err) {
        res.status(400).json({
            status: "Fail",
            message: "Fail to shown student detail",
            error: err,
        });
    }
};

exports.deleteRole = async (req, res, next) => {

    console.log("delete Params", req.params);
    try {
        const request = await deleteRoleServices(req.params);

        if (request) {
            res.status(200).json({
                status: "success",
                message: "ToggleCoursesCart successfully",
                data: request,
            })
        }

    } catch (err) {
        console.log("requestsssssssssssssssssssss44444444", err);
        next(err);
    }
};
