const CreateEmployee = require("../../model/CreateEmployee.model");
const CreateStudent = require("../../model/CreateStudent.model");

exports.createStudentServices = async (studentInfo) => {
  console.log(studentInfo)
  const registeredInfo = await CreateStudent.create(studentInfo);
  
  await CreateEmployee.updateOne(
    {
      _id: registeredInfo.counselor.id,
    },
    {
      $push: {
        students: registeredInfo._id,
      },
    }
  );
  
  return registeredInfo;
};


exports.GetAllStudentListServices = async () => {
  const submitInfo = await CreateStudent.find({});
  return submitInfo;
};



exports.getStudentById = async () => {
  const student = await CreateStudent.find(query);
  console.log("studentttttttttttt",student)
  return student;
};
