const CreateEmployee = require("../../model/CreateEmployee.model");
const CreateStudent = require("../../model/CreateStudent.model");
const UniversityDocsModel = require("../../model/UnivarsityDocsForVisa.model");
//const Employee = require("../../model/Employee.model");
const cloudinaryService = require('../cloudinaryService')

// exports.GetAllEmployeeListServices = async () => {
//   const employeesInfo = await CreateEmployee.find({});
//   return employeesInfo;
// };

// exports.GetAllEmployeeListServices = async () => {
//   const employeesInfo = await CreateEmployee.find({}).select("-students");

//   // Create a Map to store unique emails and their corresponding objects
//   const uniqueEmailMap = new Map();

//   employeesInfo.forEach(employee => {
//     // Check if the email already exists in the map
//     if (!uniqueEmailMap.has(employee.email)) {
//       uniqueEmailMap.set(employee.email, employee);
//     }
//   });

//   // Convert the Map values to an array
//   const uniqueEmailArray = Array.from(uniqueEmailMap.values());

//   return uniqueEmailArray;
// };


exports.GetAllEmployeeListServices = async () => {
  const employeesInfo = await CreateEmployee.find({}).select("-students");

  // Create a Map to store unique emails and their corresponding objects
  // const uniqueEmailMap = new Map();

  // employeesInfo.forEach(employee => {
  //   // Check if the email already exists in the map
  //   if (!uniqueEmailMap.has(employee.email)) {
  //     uniqueEmailMap.set(employee.email, employee);
  //   }
  // });

  // Convert the Map values to an array
  // const uniqueEmailArray = Array.from(uniqueEmailMap.values());

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
  const uploadedFiles = await cloudinaryService.uploadEmployeeFiles(files, employeeData.name.trimEnd());

  const newEmployee = new CreateEmployee({
    ...employeeData,
    profilePic: uploadedFiles.profilePic,
    cv: uploadedFiles.cv,
    resume: uploadedFiles.resume
  });
  await newEmployee.save();
  return newEmployee;
};
exports.addNewRoleEmployee = async (employeeData) => {
  const registeredInfo = await CreateEmployee.create(employeeData);
  console.log("addNewRoleEmployee", registeredInfo);
  
  return registeredInfo;
};
