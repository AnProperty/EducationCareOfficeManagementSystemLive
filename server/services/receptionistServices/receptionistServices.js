const CreateEmployee = require("../../model/CreateEmployee.model");
const CreateStudent = require("../../model/CreateStudent.model");

exports.createStudentServices = async (studentInfo) => {
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
  const submitInfo = await CreateStudent.find({}).sort({ createdAt: -1 });
  return submitInfo;
};



exports.GetAStudentByEmailAndNameServices = async (query) => {
  const student = await CreateStudent.find(query);

  return student;
};
