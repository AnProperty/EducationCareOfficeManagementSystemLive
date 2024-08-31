const ArchivedStudent = require("../../model/ArchivedStudent.model");
const CreateEmployee = require("../../model/CreateEmployee.model");
const CreateStudent = require("../../model/CreateStudent.model");
const UniversityDocsModel = require("../../model/UnivarsityDocsForVisa.model");
const XLSX = require('xlsx');


exports.getStudentsByStatusServices = async (query) => {
  const requestedInfo = await CreateStudent.find(query).sort({ createdAt: -1 })
    // .select("students")

  return requestedInfo;
};



exports.generateExcelFile = (data) => {
  const plainData = data.map(item => {
    return {
      studentId: item.studentId,
      fullName: item.fullName,
      email: item.email,
      phoneNumber: item.phoneNumber,
      parentPhone: item.parentPhone,
      chosenCountryName: item.chosenCountryName,
      anyCountryRefusal: item.anyCountryRefusal,
      city: item.city,
      englishProficiency: item.englishProficiency,
   


      intake: item.intake,
      overall: item.overall,
      listening: item.listening,
      specking: item.specking,
      reading: item.reading,
      writing: item.writing,
      probableDate: item.probableDate,
      testDate: item.testDate,
      createdAt: new Date(item.createdAt).toISOString(),
    };
  });

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(plainData);
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  return XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
};


exports.MoveStudent = async (studentId,employeeId) => {
  try {
    // Step 1: Find the employee and remove the student from the students array
    const employee = await CreateEmployee.findByIdAndUpdate(
      employeeId,
      { $pull: { students: studentId } }, // Remove the student reference from the array
      { new: true } // Return the updated employee document
    );

    if (!employee) {
      throw new Error("Employee not found");
    }

    // Step 2: Create a new archived student document in the ArchivedStudent collection
    const archivedStudent = new ArchivedStudent({
      student: studentId,
      removedFromEmployee: employeeId,
    });

    await archivedStudent.save();

    console.log("Student removed from employee and archived successfully.");
  } catch (error) {
    console.error("Error moving student:", error);
  }
};

