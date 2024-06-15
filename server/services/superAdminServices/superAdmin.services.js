const CreateEmployee = require("../../model/CreateEmployee.model");
const CreateStudent = require("../../model/CreateStudent.model");
const UniversityDocsModel = require("../../model/UnivarsityDocsForVisa.model");
//const Employee = require("../../model/Employee.model");
const cloudinaryService = require('../cloudinaryService')

// exports.GetAllEmployeeListServices = async () => {
//   const employeesInfo = await CreateEmployee.find({});
//   return employeesInfo;
// };

exports.GetAllEmployeeListServices = async () => {
  const employeesInfo = await CreateEmployee.find({});
  return employeesInfo;
};
exports.GetAllStudenteListServices = async () => {
  const StudentsList = await CreateStudent.find({});
  return StudentsList;
};
exports.GetAllCommissionListServices = async () => {
  console.log("Clicked");
  const StudentsList = await UniversityDocsModel.find({
    status:
      "success"
  });
  return StudentsList;
};

exports.addEmployee = async (employeeData, files) => {
  const uploadedFiles = await cloudinaryService.uploadEmployeeFiles(files, employeeData.name);

  const newEmployee = new CreateEmployee({
    ...employeeData,
    profilePic: uploadedFiles.profilePic,
    cv: uploadedFiles.cv,
    resume: uploadedFiles.resume
  });
  await newEmployee.save();
  return newEmployee;
};
