const CreateEmployeeModel = require("../../model/CreateEmployee.model");

exports.logInServices = async (requestInfo) => {
  const { email, password } = requestInfo;

  const requestedInfo = await CreateEmployeeModel.find({
    $and: [{ email: email }, { password: password }],
  });
  return requestedInfo;
};
