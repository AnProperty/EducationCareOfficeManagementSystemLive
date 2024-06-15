const
    { getStudentByVisaTeamIdServices, getUniversityDocsServices, updateStudentStatusService }
        = require("../../services/VisaTeamServices/visaTeam.services");




exports.getStudentByVisaTeamIdController = async (req, res, next) => {
    try {
        const query = req.params;
        const request = await getStudentByVisaTeamIdServices(query);
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

exports.getDocsByStdIdController = async (req, res, next) => {
    try {
        const query = req.params;
        const request = await getUniversityDocsServices(query);
        res.status(200).json({
            status: "success",
            message: "Visa Student successfully For Visa Processing",
            data: request,
        })
    } catch (err) {
        res.status(400).json({
            status: "Fail",
            message: "Can't Fetched data For Visa Processing",
            error: err,
        })
    }
}
exports.updateStudentStatusByIdController = async (req, res, next) => {
    try {
        const query = req.params;
        const body = req.body;
        console.log('queryyyyyy: ', query, body)
        const request = await updateStudentStatusService(query,body.status);
        res.status(200).json({
            status: "success",
            message: "Visa Student successfully For Visa Processing",
            data: request,
        })
    } catch (err) {
        res.status(400).json({
            status: "Fail",
            message: "Can't Fetched data For Visa Processing",
            error: err,
        })
    }
}