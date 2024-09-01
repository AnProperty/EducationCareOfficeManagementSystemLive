const { default: mongoose } = require("mongoose");
const CreateEmployee = require("../../model/CreateEmployee.model");
const CreateStudent = require("../../model/CreateStudent.model");
const UniversityDocsModel = require("../../model/UnivarsityDocsForVisa.model");
const cloudinaryService = require("../cloudinaryService");
const Notification = require("../../model/Notification.model");
const StudentDetailsModel = require("../../model/StudentDetails.model");
const AppliedUniversity = require("../../model/UniversityApplication");
const EnrolledStudent = require("../../model/EnrolledStudent.model");

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
  const StudentsList = await CreateStudent.find({}).sort({ createdAt: -1 });
  return StudentsList;
};
exports.GetAllCommissionListServices = async () => {
  const StudentsList = await UniversityDocsModel.find({
    status: "success",
  });
  return StudentsList;
};

exports.addEmployee = async (employeeData, files) => {
  const uploadedFiles = await cloudinaryService.uploadEmployeeFiles(
    files,
    employeeData.name.trimEnd()
  );

  const newEmployee = new CreateEmployee({
    ...employeeData,
    profilePic: uploadedFiles.profilePic,
    cv: uploadedFiles.cv,
    resume: uploadedFiles.resume,
  });
  await newEmployee.save();
  return newEmployee;
};
exports.addNewRoleEmployee = async (employeeData) => {
  const registeredInfo = await CreateEmployee.create(employeeData);

  return registeredInfo;
};
exports.DeleteStudent = async (studentId,employeeId) => {
  try {
    const student = await CreateStudent.findById(studentId);
     // Step 1: Delete the student from EnrolledStudent collection
     await EnrolledStudent.deleteMany({ studentId: student.studentId });
     console.log('Student removed from EnrolledStudent successfully.');
 
     // Step 2: Delete notifications related to the student
     await Notification.deleteMany({ studentId: student.studentId });
     console.log('Notifications related to the student removed successfully.');
 
     // Step 3: Delete the student from StudentDetails collection
     await StudentDetailsModel.deleteMany({ studentId: student.studentId });
     console.log('Student details removed from StudentDetails successfully.');
 
     // Step 4: Delete the student from UniversityDocs collection
     await UniversityDocsModel.deleteMany({ studentId: student.studentId });
     console.log('Student removed from UniversityDocs successfully.');
 
     // Step 5: Delete the student from AppliedUniversity collection
     await AppliedUniversity.deleteMany({ stdId: student.studentId });
     console.log('Student removed from AppliedUniversity successfully.');
     
     // Step 6: Delete the student from CreateEmployee's students
     await CreateEmployee.updateMany(
      { students: studentId },
      { $pull: { students: studentId } },
    );
    console.log('Student reference removed from CreateEmployee successfully.');

    await CreateStudent.findByIdAndDelete(studentId);
    console.log('Student removed from CreateStudent successfully.');

  } catch (error) {
    console.error('Error deleting student from collections:', error);
  }
};
