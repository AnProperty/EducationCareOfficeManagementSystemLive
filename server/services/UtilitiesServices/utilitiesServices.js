const CreateEmployee = require("../../model/CreateEmployee.model");
const CreateStudent = require("../../model/CreateStudent.model");
const UniversityDocsModel = require("../../model/UnivarsityDocsForVisa.model");
const XLSX = require('xlsx');


exports.getStudentsByStatusServices = async (query) => {
  const requestedInfo = await CreateStudent.find(query)
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

