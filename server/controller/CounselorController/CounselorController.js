const 
{getCounselorStudentByCounselorId, AssignStudentToApplicantServices,makeAdvicesServices}
 = require("../../services/counselorServices/counselor.services");

exports.getCounselorStudentByIdController = async (req, res, next) => {
    try {
        const query = req.params;
        const request = await getCounselorStudentByCounselorId(query);
        res.status(200).json({
            status: "success",
            message: "Get Counselor Student successfully",
            data: request,
        })
    } catch (err) {
        res.status(400).json({
            status: "Fail",
            message: "Can't Fetched data",
            error: err,
        })
    }
};
exports.AssignStudentToApplicantController = async (req, res, next) => {
    try {
        console.log("AssignStudentToApplicantController", req.body);
        const query = req.params;
        const request = await AssignStudentToApplicantServices(query,req.body);
        res.status(200).json({
            status: "success",
            message: "Assigned successfully",
            data: request,
        })
    } catch (err) {
        res.status(400).json({
            status: "Fail",
            message: "Can't Fetched data",
            error: err,
        })
    }
};
exports.makeAdvicesController = async (req, res, next) => {
    try {
        console.log("AssignStudentToApplicantController", req.body.advices);
        const query = req.params;
        const request = await makeAdvicesServices(query,req.body.advices);
        res.status(200).json({
            status: "success",
            message: "Assigned successfully",
            data: request,
        })
    } catch (err) {
        res.status(400).json({
            status: "Fail",
            message: "Can't Fetched data",
            error: err,
        })
    }
};