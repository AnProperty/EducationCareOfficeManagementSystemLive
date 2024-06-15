const 
{logInServices}
 = require("../../services/logInServices/logInServices");

exports.logInController = async (req, res, next) => {
    try {
        const query = req.body;
        const request = await logInServices(query);

        res.status(200).json({
            status: "success",
            message: "LogIn successfully",
            data: request,
        })
    } catch (err) {
        res.status(400).json({
            status: "Fail",
            message: "Login request Unsuccessful!!!",
            error: err,
        })
    }
};