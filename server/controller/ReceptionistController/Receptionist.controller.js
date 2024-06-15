const 
{createStudentServices, GetAllStudentListServices}
 = require("../../services/receptionistServices/receptionistServices");

exports.CreateStudentController = async (req, res, next) => {
    try {
        const studentInfo = await createStudentServices(req.body)
        
        res.status(200).json({
            status: "success",
            message: "Student Created successfully",
            data: studentInfo
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: "Can't Register Student",
            error: error,
        })
    }
};
exports.GetAllStudentListController = async (req, res, next) => {
    try {
        
        const studentList = await GetAllStudentListServices();
        res.status(200).json({
            status: "success",
            message: "Get All Students List successfully",
            data: studentList
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: "Can't get Employee List",
            error: error,
            
        })
    }
};